### Big Pipe in Action
build:0.1.1 16:58 11.4 2013

#### TL;DR 
就测量POI点  
WiFi 下首屏显示[^1]  
平均提升 `18%`
预期提升 `20%`
  
2G下波动较大(因为测试机的vps[^2]在岛国，无cluster)  
平均提升超过`30%`
预期提升 `35%`

------------------------------------

#####测试说明
- 环境
	- Ubuntu,Node	
	- Android 2.3/2009 device

- 方法
	- 开发一中间层，做两件事情
		- 分批flush数据(一个请求)
		- 透传phpui数据
	- 对比二者时长，得出结论
- 噪点控制
	- 感性均值
	
----------------------------------

#### FAQ
- ######Big Pipe提升了哪部分性能?
	- 数据下载时长
	- Normally 
		- 页面等待所有数据(~25k)返回后渲染模板
	- With BigPipe
		- 返回的第一批数据[ResponseBody] (~1k),页面立马展开渲染，同时保持连接，继续接收数据
- #####Big Pipe 损耗了什么?
	- Server重构/序列化json性能损耗
	- Client FE部分iframe性能损耗
- ##### 兼容性如何
	- Client基于H5的PostMessage，该接口在移动平台上支持较为完全[^3]
- ######为什么首屏是这样定义的?
	- 因为不同行业变化巨大，首屏共通点基本仅有这些，后续可以加入其它字段，但需要保持首批数据量尽量少
- ######首批数据量有多大?
	- Response Body 部分不超过1k
- ######成本是什么?
	- Server部分需要重新构建返回的json结构，因为没有接触过phpui的代码，故无法得出具体结论
	- FE需要重新构建数据绑定逻辑，基于现有的place代码，修改成本比较大，capability需要重新构建
----------------------------------

##### Raw Data( wifi,android 2.3, ~2009 device)

方式|电影               | 说明 /收益
:------ |:------------      |:-------------
bigpipe|jet=1203          | 第一次数据返回时间(ms)
|filltemplate=1215  | 第二次数据返回  
|filltemplate=1576  | 第二次数据返回  
|filltemplate=1794  |第三次数据返回  
normal|req_end=1152  |  全量请求时长  
|      |`-4%`| 
bigpipe|jet=859|
|filltemplate=867 |
|filltemplate=1220 |
|filltemplate=1405 |
normal|req_end=1115 |
||`+23%`|
bigpipe|jet=896
 | filltemplate=913 | 
 | filltemplate=1200 | 
 | req_end=1085 | 
 |  | `+17% `|
 
 方式|西餐               | 说明/收益 
:------ |:------------      |:-------------  
bigpipe|jet=906 | 
 | filltemplate=912 | 
 | filltemplate=1096 | 
 | filltemplate=1401 | 
normal|req_end=1366 | 
 |  | `+34%` | 
bigpipe|jet=1337 | 
 | filltemplate=1343 | 
 | filltemplate=1568 | 
normal|req_end=1571 | 
 |  |`+15% `| 
bigpipe|jet=972 | 
 | filltemplate=992 | 
 | filltemplate=1154 | 
 | filltemplate=1277 | 
normal|req_end=1347 | 
 |  | `+26%` | 


方式|商场|说明/收益
:------ |:------------      |:-------------
bigpipe|jet=883 | 
 | filltemplate=1037 | 
 | filltemplate=1321 | 
 | filltemplate=1477 | 
normal|req_end=1310 | 
 |  | `+33%` | 
bigpipe|jet=1055 | 
| filltemplate=1111 | 
| filltemplate=1558 | 
| filltemplate=1653 | 
normal|req_end=1229 | 
| | `+14%` | 
bigpipe|jet=787 | 
| filltemplate=988 | 
| filltemplate=1161 | 
normal| req_end=952| 
| | `+17%`| 

方式|美食|说明/收益
:------ |:------------      |:-------------
bigpipe|jet=1429 | 
| filltemplate=1446 | 
| filltemplate=1566 | 
| filltemplate=1652 | 
normal|req_end=1386 | 
| | `-3%` | 
bigpipe|jet=1075 | 
| filltemplate=1380 | 
| filltemplate=1439 | 
normal|req_end=1299 | 
| | `+17%` | 
bigpipe|jet=1084 | 
| filltemplate=1093 | 
| filltemplate=1209 | 
   | filltemplate=1251 | 
   normal|req_end=1255 | 
 |  | `+14% `| 
 
Powered by Markdown

[^3]:[Can I use?](http://caniuse.com/x-doc-messaging)
[^2]: 88RMB一个月，欢迎合租  
[^1]:![img](http://i.imgur.com/e9VGYRE.png?1) 我们定义首屏为红框部分