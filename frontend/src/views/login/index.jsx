
import React, { Component, Suspense } from 'react'
import "./login.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import lock from "../../assets/lock.png";
import phoneIcon from "../../assets/user.png";
import Input from "../../components/input";
import GVerify from "../../plugins/imgVerify";
import * as request from "../../utils/request";
import * as urls from "../../utils/urls";
import { showToastError, showToastSuccess, showToastWarn } from '../../utils/tool';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 验证码提示信息
      codeMsg: "",
      // 图形验证码值
      imgCodeVal: "",
      // 图形验证码实例
      gVerify: "",
    }
  }
  render () {
    const { codeMsg, imgCodeVal, gVerify } = this.state;

    return (
      <>
        <Suspense fallback={<div>加载中...</div>}>
          <div className="login">
            {/* 头部logo区域 */}
            <div className="logo-wrap">
              <div className="container-logo">
                <Link to="/">
                  <img className="logo-img" src={logo} alt="" />
                </Link>
              </div>
            </div>
            {/* 登陆信息区域 */}
            <div className="login-wrap">
              <div className="login-container">
                <div className="login-left">
                  <div className="form-group">
                    <div className="input-phone input-group">
                      <Input
                        messageList={
                          [
                            {
                              required: true,
                              message: "请输入电话号码"
                            },
                            {
                              regExp: /^1[3-9]\d{9}$/,
                              message: "请输入正确的电话号码"
                            }
                          ]
                        }
                        maxLength={11}
                        input="phone"
                        placeholder="请输入手机号码"
                        icon={phoneIcon}
                        ref={currentNode => this.inputCom = currentNode}
                      />
                    </div>
                    <div className="input-password input-group">
                      <Input
                        messageList={[
                          {
                            required: true,
                            message: "请输入6位数密码"
                          },
                          {
                            regExp: /^\d{6}$/,
                            message: "请输入正确的6位数密码"
                          }
                        ]}
                        maxLength={11}
                        input="password"
                        placeholder="请输入密码"
                        icon={lock}
                        ref={currentNode => this.pasCom = currentNode}
                      />
                    </div>
                    <div className="input-code">
                      <div>
                        <input maxLength="4" style={{ display: gVerify ? 'block' : 'none' }} onChange={this.changeImgCode} onBlur={this.onBlur} value={imgCodeVal} type="text" placeholder="请输入验证码" />
                        <p className="code-msg" style={{ color: 'red', 'marginTop': '8px' }}>{codeMsg}</p>
                      </div>
                      <p id="verify-box" className="code-img"></p>
                    </div>
                    <div className="submit" style={{ display: gVerify ? 'block' : 'none' }} onClick={this.login}>登陆</div>
                    <div className="forget-pas">忘记密码？</div>
                  </div>
                </div>
                <div className="login-right">
                  <div>
                    <p style={{ color: '#000', 'fontSize': '18px', 'marginBottom': '10px' }}>还没有账号？</p>
                    <p style={{ color: 'orange', 'fontSize': '18px' }}>立即注册账号&gt;&gt; </p>
                  </div>
                </div>
              </div>
            </div>
            {/* 底部区域 */}
            <div className="footer">
              <div className="footer-top"></div>
              <div className="triangle"></div>
              <div className="copyright">@copy;版权所有 aicoder.com 2021-6-3</div>
            </div>
          </div>
        </Suspense>
      </>

    )
  }
  componentDidMount () {
    // 实例化图形验证码
    this.setState({
      gVerify: new GVerify("verify-box")
    })
  }
  /**
   * @description 图像验证码的blur事件
   * @method onBlur
   * @param {Event事件对象} e 
   */
  onBlur = (e) => {
    // 图形验证码
    let { code } = this.state.gVerify.options
    // 文本框输入值
    let { value } = e.target;
    if (!(code === value)) {
      this.setState({ codeMsg: '验证码错误' });
    } else {
      this.setState({ codeMsg: '' });
    }
  }
  /**
   * @description 改变图形验证码值
   * @method changeImgCode
   * @param {Event事件对象} e
   */
  changeImgCode = (e) => {
    this.setState({ imgCodeVal: e.target.value.trim() })
  }
  /**
   * @description 登陆按钮
   * @method login
   */
  login = async () => {
    let { codeMsg, imgCodeVal } = this.state; // 图形验证码
    let { value: inputVal, errorMsg: inputMsg } = this.inputCom.state; // 手机号有关的信息
    let { value: pasVal, errorMsg: pasMsg } = this.pasCom.state; // 密码有关的信息
    if ((inputVal && !inputMsg) && (pasVal && !pasMsg) && (imgCodeVal && !codeMsg)) {
      const userInfo = {
        phone: inputVal,
        password: pasVal,
      }
      // 请求后台
      try {
        const res = await request.get(urls.login, userInfo);
        if (res.data.code === 0) {
          showToastSuccess(res.data.msg);
          localStorage.setItem("userInfo", JSON.stringify({ phone: inputVal, token: res.data.data.token })) // 用户信息
          // 跳转页面
          this.props.history.push("/home")
        } else {
          showToastWarn(res.data.msg);
        }
      } catch (error) {
        showToastError("请求失败");
        throw error;
      }

    } else {
      showToastWarn('请检查你填的信息');
      // 登陆失败重新刷新验证码实例
      this.state.gVerify.refresh();
    }
  }
}
