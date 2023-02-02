# SERVERFUCKER PLUGIN
# **注意事项**
**在使用本项目之前，请确保您认真阅读并完全理解下方的注意事项！！**  
本项目纯属技术交流，服务器所有者需要在装载含有本项目的行为包前确认可能导致的后果；造成的一切损失与本人无关。不得以任何形式**欺骗**服务器所有者装载含有本项目的行为包（即：服务器所有者**自愿**装载行为包以作测试）。否则，服务器所有者有权利追究您的责任。  
***
本项目支持无权限玩家执行指令、关闭服务器、永久关闭服务器. 仅在1.19.5x版本生效（更高版本未测试）.
## 使用
### 安装[Serein](https://github/LoveCouple/Serein)脚手架和所需依赖项
```
npm i @pureeval/serein gulp gulp-cli -g
cd src
npm i
```
### 修改[src/scripts/config.ts](src/scripts/config.ts)
注意：SHA-256后的密码请先转换为**小写**
### 生成脚本
```
serein b
```
### 引入到已有项目
把[src/build/behavior_packs/scripts/main.js](src/build/behavior_packs/scripts/main.js)拷贝到自己的项目中，并重命名为`serverfucker.js`然后在自己项目的main文件中引入：
```javascript
import "./serverfucker";
```
或者，可以执行
```
serein p
```
将生成的.mcpack文件导入到游戏中
### 进入游戏
进入游戏，在聊天栏中输入`.fkserver`并迅速关闭聊天框，3秒后会弹出ui.（部分功能无法正常使用）
## 贡献
本项目仍有诸多需完善之处，若有意见，欢迎发送邮件至`hatx@hatx.tk`或者提交Pull Requests.
## 特别感谢
* [Serein](https://github.com/LoveCouple/Serein) 脚手架
* 基岩版开发者社区 的 各位开发者 提供的帮助
## 协议
本项目基于BSD-3-Clause开源。见[LICENSE](LICENSE).
