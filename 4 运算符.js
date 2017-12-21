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
下面这个例子使用错误处理的元组 (并展示了该结构的多功能性)
add(a, b)
  if a is a 'unit' and b is a 'unit'
    a + b
  else
    (error 'a 和 b 必须是 units!')

body
  padding add(1,'5')
  // => padding: error "a 和 b 必须是 units";

  padding add(1,'5')[0]
  // => padding: error;

  padding add(1,'5')[0] == error
  // => padding: true;

  padding add(1,'5')[1]
  // => padding: "a 和 b 必须是 units"

范围.. ...
同时提供包含界线操作符(..)和范围操作符(...)，见下表达式：
1..5
// => 1 2 3 4 5

1...5
// => 1 2 3 4

 加减：+ -
二元加乘运算其单位会转化，或使用默认字面量值。例如，5s - 2px结果是3s
15px - 5px
// => 10px

5 - 2
// => 3

5in - 50mm
// => 3.031in

5s - 1000ms
// => 4s

20mm + 4in
// => 121.6mm

"foo " + "bar"
// => "foo bar"

"num " + 15
// => "num 15"



乘除：/ * %
2000ms + (1s * 2)
// => 4000ms

5s / 2
// => 2.5s

4 % 2
// => 0

当在属性值内使用/时候，你必须用括号包住。否则/会根据其字面意思处理（支持CSS的line-height）
font: 14px/1.5;
但是，下面这个却等同于14px ÷ 1.5:

font: (14px/1.5);
只有/操作符的时候需要这样


指数：**
指数操作符：

2 ** 8
// => 256


相等与关系运算：== != >= <= > <
相等运算符可以被用来等同单位,颜色,字符串甚至标识符。这是个强大的概念，甚至任意的标识符
都可以作为原子般使用。函数甚至可以返回yes和no代替true和false 但是不建议
5 == 5
// => true

10 > 5
// => true

#fff == #fff
// => true

true == false
// => false

wahoo == yay
// => false

wahoo == wahoo
// => true

"test" == "test"
// => true

true is true
// => true

'hey' is not 'bye'
// => true

'hey' isnt 'bye'
// => true

(foo bar) == (foo bar)
// => true

(1 2 3) == (1 2 3)
// => true

(1 2 3) == (1 1 3)
// => false


只有精确值才匹配，例如，0 == false和null == false均返回false

==    is
!=    is not
!=    isnt


真与假
Stylus近乎一切都是true, 包括有后缀的单位，甚至0%, 0px等都被认作true.

不过，0在算术上本身是false.

表达式（或“列表”）长度大于1被认为是真。
true例子：

0% 
0px
1px 
-1
-1px
hey
'hey'
(0 0 0)
('' '')


false例子：

0 
null
false
''

逻辑操作符：&& || 和 or
逻辑操作符&&和||别名是and / or。它们优先级相同。

5 && 3
// => 3

0 || 5
// => 5

0 && 5
// => 0

#fff is a 'rgba' and 15 is a 'unit'
// => true


存在操作符：in
检查左边内容是否在右边的表达式中。

简单的例子：

nums = 1 2 3
1 in nums
// => true

5 in nums
// => false

元组同样适用：
vals = (error 'one') (error 'two')
error in vals
// => false

(error 'one') in vals
// => true

(error 'two') in vals
// => true

(error 'something') in vals
// => false


混合书写试用例子：
pad(types = padding, n = 5px)
  if padding in types
    padding n
  if margin in types
    margin n

body
  pad()

body
  pad(margin)

body
  pad(padding margin, 10px)


对应于：

body {
  padding: 5px;
}
body {
  margin: 5px;
}
body {
  padding: 10px;
  margin: 10px;
}


条件赋值：?= :=
条件赋值操作符?=（别名?:）让我们无需破坏旧值（如果存在）定义变量。该操作符可以扩展成三元内is defined的二元操作。

例如，下面这些都是平起平坐的：

color := white
color ?= white
color = color is defined ? color : white
如果我们使用等号=, 就只是简单地赋值。

color = white
color = black

color
// => black
但当使用?=，第二个相当就嗝屁了（因为变量已经定义了）：

color = white
color ?= black

color
// => white


实例检查：is a
Stylus提供一个二元运算符叫做is a, 用做类型检查。

15 is a 'unit'
// => true

#fff is a 'rgba'
// => true

15 is a 'rgba'
// => false
另外，我们可以使用type()这个内置函数。

type(#fff) == 'rgba'
// => true
注意：color是唯一的特殊情况，当左边是RGBA或者HSLA节点时，都为true.



变量定义：is defined
此伪二元运算符右边空荡荡，左边无计算。用来检查变量是否已经分配了值。

foo is defined
// => false

foo = 15px
foo is defined
// => true

#fff is defined
// => 'invalid "is defined" check on non-variable #fff'
另外，我们可以使用内置lookup(name)方法做这个活动态查找。

name = 'blue'
lookup('light-' + name)
// => null

light-blue = #80e2e9
lookup('light-' + name)
// => #80e2e9
该操作符必不可少，因为一个未定义的标识符仍是真值。如：

body
  if ohnoes
    padding 5px
当未定义的时候，产生的是下面的CSS：

body {
  padding: 5px;
}
显然，这不是我们想要的，如下书写就安全了：

body
  if ohnoes is defined
    padding 5px