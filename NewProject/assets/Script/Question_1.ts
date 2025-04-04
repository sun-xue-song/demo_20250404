
const {ccclass, property} = cc._decorator;

@ccclass
export default class Question_1 extends cc.Component {

    @property(cc.EditBox)
	input_x: cc.EditBox = null;
	
	@property(cc.EditBox)
	input_y: cc.EditBox = null;

	@property(cc.Node)
	node_sp: cc.Node = null;

	@property(cc.Prefab)
	pre_sp: cc.Prefab = null;

	@property(cc.Label)
	label_tip: cc.Label = null;

	private m_map: {[key: number]: {[key: number] : cc.Node}} = {}
	private m_max: number = 10;
	private m_color_arr: string[] = ["#0000ff", "#00ffff", "#ff00ff", "#ffff00", "#ff0000"];
	private m_pro_addx: number = 10;
	private m_pro_addy: number = 15;

	/*
	创建⼀个场景，界⾯上有两个输⼊框，分别对应 X 和 Y 的值，还有⼀个⽣成按钮，点击⽣成按钮⽣成⼀
	个 10 × 10 的可控随机矩阵，并显示到界⾯上，矩阵要求如下:
	⾸先⾃由定义 5 种颜⾊
	每个点可选 5 种颜⾊中的 1 种
	按照从左到右，从上到下的顺序⽣成，(1, 1)为左上⻆点，(10, 10)为右下⻆点， (1, 10)为右上⻆点
	点(1, 1)随机在 5 个颜⾊中选取
	其他各点的颜⾊在基准概率上进⾏调整，设⽬标点坐标为(m, n)，规则如下:
	(m, n - 1)所属颜⾊的概率增加 X% (m - 1, n)所属颜⾊的概率增加 X%
	若(m, n - 1)和(m - 1 ,n)同⾊，则该颜⾊的概率只增加 Y%
	其他颜⾊平分剩下的概率
	矩阵顺序为从左到右、从上到下
	*/
	public onLoad(): void
	{
		this.input_x.string = "";
		this.input_y.string = "";

		for (let i = 1; i <= this.m_max; i++) {
			for (let j = 1; j <= this.m_max; j++){
				let _item: cc.Node = cc.instantiate(this.pre_sp);
				this.node_sp.addChild(_item);	
				let _map: {[key: number]: cc.Node} = {};
				if (this.m_map.hasOwnProperty(i))
				{
					_map = this.m_map[i];
				}
				else
				{
					this.m_map[i] = _map;
				}
				_map[j] = _item;
			}			
		}
	}


    start () {

    }

    // update (dt) {}

	// 需求表述不是很清楚，以下是自己理解
	/*
	基准概率：共5种颜色，每种颜色的基准概率应该是20%；
	（m, n-1)和(m-1,n)点的颜色是按照基础概率生成
	输入坐标点，根据（m, n-1)和(m-1,n)点的颜色 计算目标点颜色概率，得出目标的颜色。

	*/
	public onCreate()
	{
		if (this.input_x.string == "")
		{
			this.label_tip.string = "未输入的x坐标。";
			return;
		}
		if (this.input_y.string == "")
		{
			this.label_tip.string = "未输入的y坐标。";
			return;
		}
		let _x: number = parseInt(this.input_x.string);
		this.input_x.string = "";
		if ((_x > this.m_max) || (_x < 1))
		{
			this.label_tip.string = "您输入的x坐标超出范围，清重新输入。";
			return;
		}
		let _y: number = parseInt(this.input_y.string);
		this.input_y.string = "";
		if ((_y > this.m_max) || (_y < 1))
		{
			this.label_tip.string = "您输入的y坐标超出范围，清重新输入。";
			return;
		}
		this.resetColor();
		let _color: cc.Color = new cc.Color();
		// 随机（m, n-1)点的颜色
		let rand1: number = Math.floor(Math.random()*this.m_color_arr.length);
		if (_y == 1)
		{
			rand1 = -1;
		}
		else
		{
			let _node1: cc.Node = this.m_map[_x][_y-1];
			_node1.color = _color.fromHEX(this.m_color_arr[rand1]);
		}
		
		// 随机 (m-1,n)点的颜色
		let rand2: number = Math.floor(Math.random()*this.m_color_arr.length);
		if (_x == 1)
		{
			rand2 = -1;
		}
		else
		{
			let _node2: cc.Node = this.m_map[_x-1][_y];
			_node2.color = _color.fromHEX(this.m_color_arr[rand2]);
		}
		
		// 计算目标点随机概率
		let rand: number = Math.random()*100;
		let _node: cc.Node = this.m_map[_x][_y];
		if ((rand1 < 0) && (rand2 < 0))
		{
			rand = Math.floor(Math.random()*this.m_color_arr.length);
			_node.color = _color.fromHEX(this.m_color_arr[rand]);
			return;
		}
		let _pro: number[] = [20, 20, 20, 20, 20];
		let remain_pro: number = 100;
		if (rand1 == rand2)
		{
			remain_pro -= this.m_pro_addy;
			for (let i = 0; i < _pro.length; i++) {
				if (rand1 == i)
				{
					_pro[i] += this.m_pro_addy;
				}
				else
				{
					_pro[i] = remain_pro / 4;
				}
			}
			
		}
		else
		{
			remain_pro -= this.m_pro_addx*2;
			for (let i = 0; i < _pro.length; i++) {
				if ((rand1 == i) || (rand2 == i))
				{
					_pro[i] += this.m_pro_addx;
				}
				else
				{
					_pro[i] = remain_pro / 3;
				}
			}
		}
		let curRand: number = 0;
		let _index: number = 0;
		for (let k = 0; k < _pro.length; k++) {
			curRand += _pro[k];
			if (rand < curRand)
			{
				_index = k;
				break;
			}
		}
		_node.color = _color.fromHEX(this.m_color_arr[_index]);
	}

	private resetColor(): void
	{
		let _color: cc.Color = new cc.Color();
		for (let i = 1; i <= this.m_max; i++) {
			for (let j = 1; j <= this.m_max; j++){
				let _node: cc.Node = this.m_map[i][j];
				_node.color = _color.fromHEX("#ffffff");
			}			
		}
	}
}
