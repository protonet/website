/**
 * SimpleTabs - Unobtrusive Tabs with Ajax
 * 
 * Simple and clean Tab plugin for MooTools 1.1
 * including support for Ajax content and various
 * custom Events to customise the appearance.
 * 
 * To use the Ajax feature simply use an anchor
 * with an href attribute as entry. The Ajax will
 * inject the response of this url into the tab.
 * 
 * @example
 * 
 *	var tabs = new SimpleTabs($('tab-element'), {
 * 		entrySelector: 'h2.tab-entry'
 *	});
 * 
 * @version		1.0rc0
 * 
 * @see			Events, Options
 * 
 * @license		MIT License
 * @author		Harald Kirschner <mail [at] digitarald.de>
 * @copyright	2007 Author
 */
var SimpleTabs = new Class({

	/**
	 * Options
	 * 
	 * show: Number, default 0: index for the initial selected tab
	 * entrySelector: String, default ".tab-entry". Selector to find the tab elements under the given parent element
	 * classMenu: String, default "tab-menu". className for the ul that hold the tab items
	 * classWrapper: String, default "tab-wrapper". className for the wrapper that holds the container elements
	 * classContainer:  String, default "tab-container". className for the single container elements
	 * onShow: Event. Fires when a container is shown, arguments: (tabElement, containerElement, tabIndex, tabElementOld, containerElementOld, tabIndexOld)
	 * onHide: Event. Fires when a container is hidden, same arguments
	 * onRequest: Event. Fires when Ajax request starts, same arguments
	 * onComplete: Event. Fires when Ajax request is completed successfully, same arguments
	 * onFailure: Event. Fires when a Ajax request fails, same arguments
	 * getContent: Function. Callback to return the tab content element for an entry element, default is Element::getNext()
	 * 
	 */
	options: {
		show: 0,
		delay:0,
		showMenuBelow:0,
		myTimer:0,
		entrySelector: '.rgtabs-entry',
		classWrapper: 'rgtabs-wrapper',
		classMenu: 'rgtabs-menu',
		classContainer: 'rgtabs-container',
		onShow: function(toggle, container, index) {
			toggle.addClass('rgtabs-selected');
			var list = $$('.rgtabs-selected a');
			list.each(function(element) {
				element.addClass('sel');
			});
			container.setStyle('display', '');
		},
		onHide: function(toggle, container, index) {
			var list = $$('.rgtabs-selected a');
			list.each(function(element) {
				element.removeClass('sel');
			});
			toggle.removeClass('rgtabs-selected');
			container.setStyle('display', 'none');
		},
		onRequest: function(toggle, container, index) {
			container.addClass('rgtabs-ajax-loading');
		},
		onComplete: function(toggle, container, index) {
			container.removeClass('rgtabs-ajax-loading');
		},
		onFailure: function(toggle, container, index) {
			container.removeClass('rgtabs-ajax-loading');
		},
		getContent: null
	},

	/**
	 * Constructor
	 * 
	 * @param {Element} The parent Element that holds the entry elements
	 * @param {Object} Options
	 */
	initialize: function(el, options) {
		this.setOptions(options);
		this.element = $(el);
		this.current = 0;
		this.selected = null;
		this.build();
		this.loadActive();
		this.prepareTimer(this.options.show+1);
	},

	build: function() {
	/*
	var list = $$('.rgtabswrap');
list.each(function(element) {
element.removeClass("rgtabswrap");
element.style.display="block";
});
*/

		this.entries = [];
		var count =0;
		var count2 =0;
		
		
		
    this.element.getElements(this.options.entrySelector).each(function(el) {
			count++
		});
		this.count = count;
		
		/*
		* modified by markus gettrup
		* add second class to ul element: "this.options.classMenu-{nr of tabs}"
		*/
		this.menu = new Element('ul', {'class': this.options.classMenu + " " + this.options.classMenu + "-" + this.count});
		this.wrapper = new Element('div', {'class': this.options.classWrapper});
		
		this.navPrev = new Element('a', {
  				'href': 'javascript:void(0)',
  				'class': 'rgtabs-nav prev',
  				'events': {
					'click': this.moveNav.bindWithEvent(this, 'prev')
  				}
  			}).setHTML('&laquo; vorherige Seite');

		this.navNext = new Element('a', {
  				'href': 'javascript:void(0)',
  				'class': 'rgtabs-nav next',
  				'events': {
					'click': this.moveNav.bindWithEvent(this, 'next')
  				}
  			}).setHTML('nächste Seite &raquo;');
		
		
		this.element.getElements(this.options.entrySelector).each(function(el) {
		  

			if (count2==0) {
        classname="tabfirst";
      } else if (count2+1==count) {
        classname="tablast";
      } else {
        classname="tabmiddle";
      }
      count2++;
			var content = el.href || (this.options.getContent ? this.options.getContent.call(this, el) : el.getNext());
			this.addTab(el.innerHTML, el.title || el.innerHTML, content,classname);
		}, this);
		
		// change position of tabs to below
		if (this.options.showMenuBelow==1) {
			this.menu2=  this.menu.clone();
				this.element.empty().adopt(this.wrapper).adopt(this.menu);
//			this.element.empty().adopt(new Element('div').addClass('topmenu').adopt(this.menu2)).adopt(this.wrapper).adopt(this.menu);
// 			this.element.empty().adopt(this.wrapper).adopt(this.menu).adopt(new Element('div').addClass('rgtabs-pageswrapper').adopt(this.navPrev).adopt(this.navNext));			
		} else {
			this.element.empty().adopt(this.menu).adopt(this.wrapper);
		}

		if (this.entries.length) {
      this.select(this.options.show);
      this.current = this.options.show;
    }
	},
	foo: function(index) {
	 	alert(index);
	},
	/**
	 * Add a new tab at the end of the tab menu
	 * 
	 * @param {String} inner Text
	 * @param {String} Title
	 * @param {Element|String} Content Element or URL for Ajax
	 */
	addTab: function(text, title, content,classname) {
		if ($type(content) == 'string' && !$(content)) var url = content;
		var container = $(content) || new Element('div');
/*
		this.entries.push({
			container: container.setStyle('display', 'none').addClass(this.options.classContainer).inject(this.wrapper),
			toggle: new Element('li').addClass(classname).adopt(new Element('a', {
				href: 'javascript:void(0)',
				title: title,
				events: {
					//mouseover: this.onClick.bindWithEvent(this, [this.entries.length]),
					click: this.onClick.bindWithEvent(this, [this.entries.length])
					
				}
			}).setHTML(text)).inject(this.menu),
			url: url || null
*/
 		var linkElement = new Element('a', {
 				href: 'javascript:void(0)',
 				title: title,
 				events: {
 					click: this.onClick.bindWithEvent(this, [this.entries.length])
 				}
 			});
 		if(typeof Element.setHTML != 'undefined')linkElement.setHTML(text);
 		else linkElement.set('html',text);
 		
 		
 		this.entries.push({
 			container: container.setStyle('display', 'none').addClass(this.options.classContainer).inject(this.wrapper),
 			toggle: new Element('li').addClass(classname).adopt(linkElement).inject(this.menu),
 			url: url || null
		});
		return this;
	},

	onClick: function(evt, index) {
		evt.stop();
		$clear(this.options.myTimer);
		this.select(index);
	},

	/**
	 * Needed by navigation prev/next functionality
	 * @author adrian@foeder.de
	 * @see declaration of "this.navPrev" and "this.navNext"
	 */
	moveNav: function(evt, dir) {
		evt.stop();
		var stepDir = ('prev'==dir ? -1 : 1);
		var newStep = 0;

		if (dir=='prev') {
			if (this.selected==0) newStep = this.count-1;
			else newStep= this.selected-1; 		
		} else {
			if (this.selected+1==this.count) newStep = 0;
			else newStep= this.selected+1; 		
		}
		
		this.select(newStep);
	},
	
	/**
	 * Select the tab via tab-index
	 * 
	 * @param {Number} Tab-index
	 */
	select: function(index) {

    if (this.selected === index || !this.entries[index]) return this;
		var entry = this.entries[index];
		var params = [entry.toggle, entry.container, index];
		if (this.selected !== null) {
			var current = this.entries[this.selected];
			if (this.ajax && this.ajax.running) this.ajax.cancel();
			params.concat([current.toggle, current.container, this.selected]);
			this.fireEvent('onHide', [current.toggle, current.container, this.selected]);
		}
		this.fireEvent('onShow', params);
		if (entry.url && !entry.loaded) {
			this.ajax = new Ajax(entry.url, $merge({
				onRequest: this.fireEvent.pass(['onRequest', params], this),
				onFailure: this.fireEvent.pass(['onFailure', params], this),
				onComplete: function(resp) {
					entry.loaded = true;
					entry.container.empty().setHTML(resp);
					this.fireEvent('onComplete', params);
				}.bind(this)
			}, this.options.ajaxOptions)).request();
		}
		this.selected = index;

		this.prepareTimer(this.selected+1);
		
		return this;
	},
	
	loadActive: function() {
	  var show = -1;
    
    this.element.getElements('.rgtabs-wrapper .rgtabs-container a[id^="c"]').each(function(anchorid, i) {
        if (window.location.hash.test(anchorid.id)) {
          show = i;
          //alert(i);
        }
    });    
    
    if (show!=-1) {
          this.select(show);
          //alert('2222'+show);    
    }
  },
	prepareTimer: function(index) {
	    if (this.options.delay>0) {
        if (index >=this.count) index = 0;
      this.options.myTimer =  this.select.delay(this.options.delay, this,index);
      }
	}  

});

SimpleTabs.implement(new Events, new Options);
