http://www.zhangxinxu.com/jq/stylus/selectors.php

闲来无事学点习
今天我要学习的是Stylus
大佬们都在用
其实是手痒 奈何有个剑哥送的Filco青轴机械键盘
不敲不舒服

跟sass和less类似吧 区别在学习完后再做对比


1 - 选择器 Selectors

1.1 - 缩排 Indentation
stylus中空格有重要的一样 所以我们使用缩排和凹排来替代{}

body
	color white

上面的代码就相当于

body {
	color: #fff;
}

如果你喜欢 你可以把冒号加上 用作分隔 便于阅读

body
	color: white



1.2 - 规则集
stylus跟css一样 允许你用逗号为多个选择器同时定义属性

textarea, input
	border 1px solid #eee


等同于
textarea,
input {
	border 1px solid #eee;
}

该规则唯一的例外就是长得像属性的选择器。例如，下面的foo bar baz可能是个属性或者是选择器

foo bar baz
> input
	border 1px solid #eee

为了解决这个问题 我们在尾部加一个逗号

foo bar baz,
form input,
> a
	border 1px solid #eee


1.3 - 父级引用
字符&指向父选择器 下面这个例子 我们两个选择器 textarea 和 input 在:hover伪类选择器上都改变了color的值

textarea
input
	color #a7a7a7
	&:hover
		color #000


等同于
textarea
input{
	color #a7a7a7
}
textarea:hover,
input:hover {
	color: #000;
}

下面这个例子 IE浏览器利用了父级引用以及混合书写来实现2px的边框
box-shadow()
	-webkit-box-shadow arguments
	-moz-box-shadow arguments
	html.ie8 &,
	html.ie7 &,
	html.ie6 &,
		border 2px solid arguments[length(arguments) - 1]

body
	#login
		box-shadow 1px 1px 1px #eee

其变身后为

body #login {
	-webkit-box-shadow: 1px 1px 3px #eee;
	-moz-box-shadow: 1px 1px 3px #eee;
	box-shadow: 1px 1px 3px #eee;
}
html.ie8 body #login,
html.ie7 body #login,
html.ie6 body #login {
	border: 2px solid #eee;
}


1.4 - 消除歧义
类似padding -n的表达式可能几倍解释成减法运算 也可能被释义为一元负号属性 为了避免这种
用括号包裹表达式

pad(n)
	padding (- n)

body
	pad(5px)

编译为
body {
	padding: -5px;
}


然而只有在函数中才会这样(因为函数同事返回值扮演混合或者回调)

例如 下面这个就是OK的
body
	padding -5px

有stylus无法处理的属性值？unquote()可以帮你
filter
unquote('progid:DXImageTransform.Microsoft.BasicImage(rotation=1)')

生成为
filter
progid:DXImageTransform.Microsoft.BasicImage(rotation=1)