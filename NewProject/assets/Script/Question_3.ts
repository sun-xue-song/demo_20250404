
const {ccclass, property} = cc._decorator;

@ccclass
export default class Question_3 extends cc.Component {

    /*
	请仔细观察附件中知名消除类游戏 Candy Crush 或 Candy Crush Saga 中选关界⾯对话框 Play 按钮的
	动画效果，包括按钮出现，按钮按下，以及按钮弹起效果，使⽤ Cocos Creator 复制这⼀效果，使⽤代
	码实现或者 Animation 编辑均可
	*/

    @property(cc.Animation)
    m_playbtn: cc.Animation = null;

    onLoad () {
    }

    start () {

    }

    // update (dt) {}

    public onShowBtn(): void
    {
        this.m_playbtn.node.active = true;
        this.m_playbtn.play("btn_open");
    }

    
    public onHideBtn(): void
    {
        this.m_playbtn.stop("btn_shake");
        this.m_playbtn.play("btn_close");
    }

    public onShake(): void
    {
        this.m_playbtn.play("btn_shake");
    }

    public onClose(): void
    {
        this.m_playbtn.node.active = false;
    }
}
