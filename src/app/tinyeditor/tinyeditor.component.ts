import { Component, OnInit, OnDestroy, AfterViewInit, EventEmitter, Input, Output} from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'tinyeditor',
  templateUrl: './tinyeditor.component.html',
  styleUrls: ['./tinyeditor.component.scss']
})

export class TinyeditorComponent implements OnInit, AfterViewInit, OnDestroy {

	@Input() elementId: string;
	@Input() itemImgSrc: string;
	@Input() itemTitle: string;
  @Output() editorKeyup = new EventEmitter<any>();
	@Output() editorClosed = new EventEmitter<boolean>();
  
	private editor:any;
	
  constructor() { }

  ngOnInit() { }
	
	ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'textcolor', 'table'],
			toolbar: 'undo redo | styleselect | bold italic | forecolor backcolor | link image | alignleft aligncenter alignright | close',
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
				const eventStream = Observable.fromEvent(editor.getElement(), 'keyup')
				.debounceTime(1000);
				
				eventStream.subscribe(t => this.editorKeyup.emit(t));
				editor.addButton('close', {
      		text: 'X',
					onclick: () => {
						this.editorClosed.emit(true);
					},
					onpostrender: (e) => {
						let parentElement = e.control.$el[0].parentElement;
						parentElement.style.position = "absolute";
						parentElement.style.top = "5px";
						parentElement.style.right = "5px";
					}
    		});
      },
			init_instance_callback: (editor) => {

			}
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
