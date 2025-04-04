
const {ccclass, property} = cc._decorator;

@ccclass
export default class Question_2 extends cc.Component {

    /*
	现有整型数组 a、整型数组 b、以及整型 v，请编写函数，判断是否可以从 a 中选择⼀个数，从 b 中选
	择⼀个数，⼆者相加等于 v，如可以返回 true，否则返回 false。⽐如如下输⼊将返回 true，因为 a 中
	40 和 b 中 2 相加为 42。代码编写完毕后，⽤⼤ O 表示法分析⼀下代码的时间复杂度。
	a = [10, 40, 5, 280];
	b = [234, 5, 2, 148, 23];
	v = 42;
	*/

	
    @property(cc.EditBox)
	input_value: cc.EditBox = null;
	
	@property(cc.Label)
	label_tip: cc.Label = null;

	private a: number[] = [10, 40, 5, 280];
	private b: number[] = [234, 5, 2, 148, 23];

    onLoad () {

	}

    start () {

    }

	public onRun()
	{
		if (this.input_value.string == "")
		{
			this.label_tip.string = "请输入要查找的数值。"
			return;
		}
		let _value: number = parseInt(this.input_value.string);
		this.input_value.string = ""; 
		let _o: number = 0;
		for (let i = 0; i < this.a.length; i++) {
			for (let j = 0; j < this.b.length; j++) {
				_o++;
				if ((this.a[i] + this.b[j]) == _value)
				{
					this.label_tip.string = "查找成功，时间复杂度为：" + _o;
					return;
				}
			}
			
		}
		this.label_tip.string = "查找失败，时间复杂度为：" + _o;
	}

    // update (dt) {}
}
