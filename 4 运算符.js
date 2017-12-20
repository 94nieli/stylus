4 - 运算符 	Operators

4.1 - 运算符优先级 下表的运算符优先级 从最高到最低
[]
! ~ + -
is defined
** * / %
+ -
... ..
<= >= < >
in
== is != is not isnt
is a
&& and || or
?:
= := ?= += -= *= /= %=
not
if unless


4.2 - 一元运算符
!0
// => true

!!0
// => false

!1
// => false

!!5px
// => true

-5px
// => -5px

--5px
// => 5px

not true
// => false

not not true
// => true

逻辑运算符not的优先级较低 因此 下面这个例子可以替换
a = 0
b = 1
!a and !b => false
解析为(!a) and (!b)

not a or b => false
解析为 not (a or b)


4.3 - 二元运算符
下标运算符[]允许我们通过索引获取表达式内部值 括号表达式可以充当元组 如(15px 5px) (1, 2, 3)