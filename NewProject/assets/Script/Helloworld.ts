const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Node)
    node_menu: cc.Node = null;
    
    @property(cc.Node)
    node_question1: cc.Node = null;
    
    @property(cc.Node)
    node_question2: cc.Node = null;
    
    @property(cc.Node)
    node_question3: cc.Node = null;

    start () {
        this.onClose();
        
    }

    public onQuestion1(): void
    {
        this.node_question1.active = true;
    }

    public onQuestion2(): void
    {
        this.node_question2.active = true;
    }

    public onQuestion3(): void
    {
        this.node_question3.active = true;
    }

    public onClose(): void
    {
        this.node_menu.active = true;
        this.node_question1.active = false;
        this.node_question2.active = false;
        this.node_question3.active = false;
    }
}
