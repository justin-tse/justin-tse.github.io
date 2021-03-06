- 查询计算机网络配置信息的命令是什么？
linux / mac: ifconfig(interface)
windows: ipconfig
```
windows: ipconfig
linux/mac: ifconfig (if 为 interface 的缩写)
```


- 什么是mac地址？
MAC地址（英语：Media Access Control Address），直译为媒体访问控制地址，也称为局域网地址（LAN Address），以太网地址（Ethernet Address）或物理地址（Physical Address），它是一个用来确认网络设备位置的地址。在OSI模型中，第三层网络层负责IP地址，第二层数据链接层则负责MAC地址。MAC地址用于在网络中唯一标示一个网卡，一台设备若有一或多个网卡，则每个网卡都需要并会有一个唯一的MAC地址。
```
Media Access Control
简称物理地址
占六个字节，是网卡出厂时设置的唯一地址
用于在局域网（直接连接的设置）间通信使用，将会出现在以太网帧的包头里
因为局域网中多台设备可能连接到了同一个总线，任何一个设备向网线上发送信号，其它所有设备都能收到
此时需要标明消息是发给谁的
```

- 交换机与集线器有什么区别？
集线器，里面是有电压放大器，没芯片，物理层设备，1层设备。
交换机，是2层设备，根据链路包里具体的信息来决定传输
```
集线器是物理层设备
集线器会将收到的信号从每个端口发送出去
交换机是链路层设备
交换机会记录每个网口连接的设备的mac地址
交换机会根据收到的包的接收者mac地址将数据包从接收者连接的端口发送出去
```

- 交换机的接口有mac地址吗？为什么？
不太对，没有，理由是实现二层转发不需要接口拥有mac地址，对于交换机来说转发数据帧只需要使用mac地址表，所以接口是否有mac地址也不影响数据转发。 二层交换机只工作在广播域内，数据帧的源目mac不需要发生转换。 所以不需要mac地址。[Source - zhihu](https://www.zhihu.com/question/63497028#:~:text=%E6%B2%A1%E6%9C%89%EF%BC%8C%E7%90%86%E7%94%B1%E6%98%AF%E5%AE%9E%E7%8E%B0%E4%BA%8C,%E6%89%80%E4%BB%A5%E4%B8%8D%E9%9C%80%E8%A6%81mac%E5%9C%B0%E5%9D%80%E3%80%82)
```
没有。
对于连接到交换机的网络设备来说，它会认为自己还连接的是总线或集线器
```

- 路由器的接口有mac地址吗？为什么？
有。路由器的每个接口都是有ip地址的。有ip地址必然需要有mac地址。

- 什么叫网管交换机？
```
带一定网络管理功能的交换机
如mac地址或ip地址与端口绑定
连接到某端口的设备只能声称自己有某mac地址和ip地址，一旦声称，拔掉网线之前是不能改的
由于还可能会识别数据包中的网络层的信息，有些也称为三层交换机

```

- 何为载波帧听多路访问？
载波侦听多路访问（英语：Carrier Sense Multiple Access，缩写：CSMA）是一种介质访问控制（MAC）的协议。载波侦听（英语：Carrier Sense）指任何连接到介质的设备在欲发送帧前，必须对介质进行侦听，当确认其空闲时，才可以发送。[Source - wiki](https://zh.wikipedia.org/wiki/%E8%BD%BD%E6%B3%A2%E4%BE%A6%E5%90%AC%E5%A4%9A%E8%B7%AF%E8%AE%BF%E9%97%AE)
```
载波帧听：设备在发送信息的时候同时侦听有无其它设备也正在发送，如果有的话，双方会同时放弃此次的发送
多路访问：指同一条线路或信道有多个设备同时使用
```

- 为何要使用曼彻斯特编码或差分曼彻斯特编码？
```
因为这两种编码都会在每个时钟周期切换信号的跳变
这种跳变实则隐含了时钟周期
但是也会带来跳变次数的加倍，导致单位时间传输的数据极限减半
```

- 为何要做时钟同步？
```
因为通信的设备间时钟不可能完全一致
```

- 网络与快递的相似之处体现在什么地方？
相似之处都是分层的，寄件人寄给收件人，网络有寄件人的ip到目的地到IP就可以传输；快递中转站，类似网络的路由。
```
数据包的中转：
数据包是通过若干设备慢慢中转到目的地的
快递包裹也是中转到达的
ip地址与快递地址：
ip地址中前缀也类似于快递地址中的省、市
分层：
快递公司为各种公司提供服务，快递公司本身依赖汽车，汽车依赖于公路
```

- 为什么ip地址是按地区划分的？
因为IP的划分时按照不同地方给定不一样的
```
大多数路由器在转发数据包的时候，不需要也不可能根据完整目的ip地址进行转发
而是只会根据目的ip地址的前缀来转发
就必然导致前缀相同或相似的目的ip地址的数据包被转发到相同或大致相同的方向
结果就是同一个地区的ip地址大致相同
```

- ping命令做了什么？抓包查验证。
向另一个设备打招呼，如果能连通有回应，证明两个设备之间时可通的。
```
发送了一个类似“有人吗？”的数据包到目的ip，期待其回复
这个信息是通过ICMP协议编码的
统计收到回复时经过的时间，结果统计结果
```

- 抓包查看并验证tracert的原理。
```

```

- 实验两台电脑直接使用网线连接，设置合适的ip地址后相互ping通。
```

```

- 实验连接在同一交换机的电脑设置不同网络的ip地址是无法相互ping通。
```

```


- 如何理解VPN？它工作在哪一层？
VPN就像一个虚拟网线连接到远程如公司机房的服务器上，实现远程可以进入公司内网，同时vpn是企业级的工具，发送和接收的数据都会加密。它工作在网络层。

```
相同于机器通过现有网络虚拟出一根网线插到了VPN服务器所在机房
机器会多出一张虚拟的网卡，网卡还会获得ip地址
工作在网络层或链路层
```

- IP数据包是如何到达目地址的？


```
通过中间路由器的转发
自己写的（路由表怎么来的（1）人为指定（2）路由器们协商得出的（主干路由））
```

- IPv6如何在现行网络上工作？
现在全世界的网络基本上以IPv4为主，可以把IPv4比喻为水，IPv6通过IPv4是用了，会转换为IPv4，或者说用IPv4包住，过了IPv4后进到IPv6又解开IPv4包，变为IPv6

```
IPv6 Over IPv4（主干上的路由是基本不变的）
```

- DHCP是什么？其协商过程是怎样的？为什么会有租约时间的限制？
DHCP是Dymic Host Configution Protocol
DHCP时基于UDP的

```
Dynamic Host Configuration Protocol 动态主机配置协议
即主机自动获取ip地址配置信息的协议
广播

为什么会有租约时间的限制？
因为设备在拔掉网络直接离开时，已经没有机会通过该网络了
```

- 物理层、链路层、网络层分别主要关心的是什么？
物理层关心的是数据传输01不要错误，链路层关心的是能找到目标，网络层关心的是能确定已经传送到位。

```
物理层关心的01的正确送达与理解
链路层关心的时直接由电缆连接的多个设备间的通信
网络层关心网络中任意两台设备间的通信
```

- 什么是MTU？典型值是多少？什么情况下其大小不是典型值？


```
Max Transport Unit 最大传输单元
以太网的MTU典型值时1500字节
连接VPN的时候（把你现有的数据包包裹起来）
```

- 带宽与延迟分别代表什么？说出常见应用更关注带宽还是延迟。


```
带宽指每秒传输的数据量/类似于公路的宽度  xxx bps
延迟(delay)数据到达目的地的时间/类似于公路的长度  xxx ms
（带宽 * 延迟 == 没发出去的数据量）
关注延迟的：游戏，语音，视频
关注带宽的：直播，下载
```

- DNS服务是什么？其沟通过程是怎样的？为什么不能用域名的方法指定DNS服务器？能否在某台机器上改变一个域名的指向？如何操作？


```
域名解析服务，即查询域名的ip地址的服务
请求，响应
因为如果用域名指定，这个域名得先被解析出来
能，修改hosts文件
```

- 0.0.0.0与255.255.255.255这两个地址在不同情况代表什么？
0.0.0.0可以不知道自己ip地址的时候代表自己的地址
或在自己的电脑上使用时，代表自己电脑的所有地址
255.255.255.255 代表广播地址

```

```

- 用手机流量连接教室vpn以实现查看我电脑上的共享文件。


```

```

- 到阿里云申请一个域名并将一个子域名指向某ip地址。


```

```

```js
sock = dgram.createSocket('udp4')

sock.bind(portNumber) // 绑定端口

sock.send(data, port, ip)

sock.setBoardcase(true) // 设置广播发送

sock.addMembership('239.x.x.x') // 加入频道
sock.send(data, 12345, '255.255.255.255') // 发送广播
sock.send(data, 12345, '239.x.x.x') // 发送组播

sock.addEventListener('message', (data, info) => {
info// 发送者的相关信息，ip，端口，数据长度
})

sock.address() // 获取自己的地址
```

```js
var net = require('net')

var server = net.createServer()

server.on('connection', conn => {
console.log(conn.remoteAddress, conn.remotePort, 'comes in')

conn.write('将会把发过来的数据转成大写发回去')

conn.on('data', data => {
conn.write(data.toString().toUpperCase())
})

conn.on('error', () => { })
})

server.listen(55888, () => { // 开始监听
console.log('监听成功')
})

// server.close() // 停止监听


//  以上是服务器

var conn = net.connect(55888, '10.3.3.3')

// conn.on('data', data => {
//   console.log(data.toString())
// })

conn.read(5)

conn.write('aaaa'.repeat(10000000))
```

- 请说出UDP协议的通信模型。


- 请说出TCP协议的通信模型。


- 如何可以知道某台机器的某个udp端口是否打开？
```

```

- 如何查看当前系统中打开的TCP连接？
- 如何查看当前系统中正在侦听的TCP服务端口及UDP端口？
```
  windows: 资源监视器
  linux/max: ss查看连接  ss -l 查看侦端口
```

- TCP头部的序列号和确认号分别代表什么？
```
  序列号：代表发送方发送的这个数据包中第一个字节的总编号
  确认号：代表接收方已经收到了这个号码之前的字节，或是这个字节所在的数据包是
```

- 为什么建立TCP连接需要三次握手？断开时需要四次挥手？
```
  三次握手：一次有效的信息交换本来就需要至少三次成功的单向通信。
          三次才能让双方确认自己发的对方能收到，对方发的自己能收到。
  四次挥手：不一定是四次，也可能是三次
          可能为四次的原因为tcp可能处于半开状态，即一方不再发只收，另一方不收只发。
```

- TCP协议关注的重点是什么？
```
  数据
  数据管道
  程序到程序间的双向按序送达
```

- 为什么红蜘蛛软件人多也不卡？但有可能花屏？
```
  因为红蜘蛛用的是udp广播，数据只会发送固定的次数，有可能产生丢包
  而广播不随人数的变化而降低效率。
```

- 为什么另一个投屏软件人多就会卡？
```
  因为它用的是tcp，只能单播
  不仅会卡：是因为人多让网络拥塞
  还会延迟：因为可能存在队头阻塞
```

- 有一个协议叫NTP，意为网络时间协议，用来对系统进行对时，不查网络，请问你觉得它基于什么协议？
```
  它基于UDP
    数据包小，而且更在意延迟的长短，用TCP根本就无法知道数据包在背后被重传了多少次
  TCP是为了保证发送的包有序到达，而这个对时间仅仅有1个包，同时tcp需要3次握手会延迟，对于对时间不好。TCP可以看成就是多个UDP的组合
```

- 为什么DNS协议不基于TCP而要基于UDP？
```
  DNS请求所需要的数据足够小，小到一个UDP包就可以完全容纳。
```

- 为什么另一些协议需要基于TCP？
```
  因为他们可能要发送大量的数据，并且保证数据的正确性。
```

- 什么情况更适合TCP，什么情况更适合UDP？
```
  更适合TCP：数据量大且需要保证按序送达时
    数据量大但不需要按序送达也可以用UDP，如红蜘蛛
  更适合UDP：数据量可以在一个UDP包里放下，或者一个小数据包的来回就成了全部的对话过程，或者保证实时性如DNS, DHCP, NTP
```



- 什么是NAT？它的目的是？
```

```

- NAT会产生什么副作用？
```

```

- 如何知道自己的电脑是否处于NAT网络中？
```

```

- 如果是，如何知道自己所在网络的公网IP地址？原理是？
```

```

- 什么是DMZ？作用是？
```

```

- 如何知道一台机器的某个端口是否有TCP Server正在侦听？
```

```

- TCP连接时出现的CONNECTION_REFUSED和CONNECTION_TIME_OUT以及CONNECTION_RESET报错分别代表什么意思？
```

```

- 什么是TCP协议的粘包？上层应该如何处理这种情况？
```

```

- FTP为何基于TCP而不是UDP？
```

```

- FTP中传输数据时为什么要新开一个TCP连接？
```

```

- 非对称加密的特点是什么？它能实现哪些看似难以完成的任务？
```

```

- websocket协议的模型是？它解决的主要问题是什么？
```

```

- 证书中包含什么信息？为什么它不可伪造？并且其它人拿了也没用？
```

```
