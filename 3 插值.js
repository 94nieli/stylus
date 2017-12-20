3 - 插值 Interpolation

3.1 - 插值
stylus支持通过使用{}字符包围表达式来插入值，其会变成标识符的一部分
例如 -webkit-{'border' + '-radius'}等于 -webkit-border-radius

比较好的例子就是 私有前缀属性扩展

vender(prop, args)
	-webkit-{prop} args
	-moz-{prop} args
	{prop} args

border-radius()
	vender('border-radius', arguments)

box-shadow()
	vender('box-shadow', arguments)

button
	border-radius 1px 2px / 3px 4px

变身：
button {
	-webkit-border-radius: 1px 2px / 3px 4px;
	-moz-border-radius: 1px 2px / 3px 4px;
	border-radius: 1px 2px / 3px 4px;
}

3.2 - 选择器插值

插值也可以在选择器上起作用 例如 我们可以再指定表达前5行的高度
如下：

table
	for row in 1 2 3 4 5
		tr:nth-child({row})
			height: 10px * row

也就是
table tr:nth-child(1) {
  height: 10px;
}
table tr:nth-child(2) {
  height: 20px;
}
table tr:nth-child(3) {
  height: 30px;
}
table tr:nth-child(4) {
  height: 40px;
}
table tr:nth-child(5) {
  height: 50px;
}