2 - 变量 Variables

2.1 - 我们可以指定表达式为变量 然后在我们的样式中贯穿使用

font-size = 14px

body
	font font-size Arial, sans-serif


编译为
body {
	font: 14px Arial, sans-serif;
}

变量甚至可以组成一个表达式列表
font-size = 14px
font = font-size "Lucida Grande", Arial

body
	font font sans-serif

编译为
body {
	font: 14px "Lucida Grande", Arial sans-serif;
}

标识符(变量名，函数等) 也可能包括$字符 例如
$font-size = 14px
body {
	font: $font-size sans-serif;
}


2.2 - 属性查找

stylus有另外一个很酷炫的功能 不需要分配给变量就可以定义引用属性
下面是个很好的例子 元素水平处置居中对齐 (典型的方法是使用百分比和margin负值)
#login
	position: absolute
	top: 50%
	left: 50%
	width: w = 150px
	height: h = 80px
	margin-left: -(w / 2)
	margin-top: -(h / 2)

我们不使用这里的变量w和h，而是简单的前置@字符在属性名前来访问该属性名对应的值：

#login
	position: absolute
	top: 50%
	left: 50%
	width 150px
	height 80px
	margin-left: -(@width / 2)
	margin-top: -(@height / 2)


另外使用案例是基于其他属性有条件的定义属性 在下面这个例子中我们默认指定z-index值为1
但是只有在z-index之前未指定的时候才这样

position()
	position: arguments
	z-index: 1 unless @z-index

#logo
	z-index: 20
	position: absolute

# logo2
	position: absolute

属性会向上冒泡查找堆栈直到被发现 或者返回NULL (如果属性搞不定) 下面这个例子 @color被弄成了blue

body
	color: red
	ul
		li
			color: blue
			a
				background-color: @color