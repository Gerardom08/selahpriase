import { CommonModule } from '@angular/common';
import { Component, OnChanges, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

@Component({
  selector: 'sa-tree-view',
  standalone:true,
  imports:[
    CommonModule
  ],
  template: '<div class="sa-tree-view tree"></div>'
})
export class TreeViewComponent implements OnChanges {

  @Input() items: any;
  @Output() change = new EventEmitter<any>();
  public checkSelected:string="";


  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.items && this.render();
  }

  private render() {
    const root = this.el.nativeElement.getElementsByTagName('div')[0];
    root.classList.add('sw-domain-tree');
    const childElements = root.getElementsByTagName('ul')[0];
    if(childElements){
      this.renderer.removeChild(root,childElements);
    }
    root.appendChild(this.createBranch(this.items, { expanded: true }));
  }

  private createChild(item: any) {
    let i: any, branch: any;
    const li = document.createElement('li');
    li.innerHTML = item.content ?? "";
    if (item.havechildren) {
      li.classList.add('parent_li');
      i = this.addPlusMinusSign(li, item);
      if(item.children){
        branch = this.createBranch(item.children, item);
        li.appendChild(branch);
      }
    }

    this.renderer.listen(li, 'click', (event) => {
      event.stopPropagation();
      /* console.log(':::ite,: ', item);
      console.log(event,event.target.tagName,event.target.type); */
      //show children nodes
      if (item.havechildren && (event.target.tagName=="I" && event.target.className.indexOf("togle")>=0)) {
        item.expanded = !item.expanded;
        this.togglePlusMinusSign(i, item);
        if(branch){
          (item.expanded)?branch.classList.add("active"):branch.classList.remove("active");
        }
        if(item.expanded && !item.children) this.change.emit({"item":item,"option":1});
      }
      //checkbox of node
      else if(event.target.type=="checkbox"){
        let newCheck = '.check-'+item.id;
        let box;
        if(this.checkSelected!==""){
          box = $(this.checkSelected);
          box.prop('checked',false);
        }
        if(newCheck===this.checkSelected){
          box = $(this.checkSelected);
          box.prop('checked',false);
          this.checkSelected="";
        }else{
          this.checkSelected=newCheck;
          box = $(this.checkSelected);
          box.prop('checked',true);
        }
        this.change.emit({"item":item,"option":2,"checked":event.target.checked});
      }
      else if(event.target.id=="edit-domain"){
        this.change.emit({"item":item,"option":3});
      }
      else if(event.target.id=="delete-domain"){
        this.change.emit({"item":item,"option":4});
      }
    });

    return li;
  }

  private createBranch(items: any, parent: any) {
    const ul = document.createElement('ul');
    items.forEach((item: any) => {
      ul.appendChild(this.createChild(item))
    });
    if(parent.expanded)ul.classList.add('active');
    (parent?.id)?ul.classList.add("nested"):ul.classList.add("sw-domain-tree-list");
    return ul;
  }

  private addPlusMinusSign(li: any, item: any) {
    const i = document.createElement('i');
    this.togglePlusMinusSign(i, item);
    const parent = li.getElementsByClassName('sw-domain-tree-list-info')[0];
    if (parent) {
      parent.insertBefore(i,parent.children[parent.children.length]);
    }
    return i;
  }

  private togglePlusMinusSign(i: any, item: any) {
    i.className = item.expanded?'fa fa-minus-circle icn togle px-1':'fa fa-plus-circle icn togle px-1';
  }
}
