/**
 * UI/Components/NavigationUI/NavigationUIV0/NavigationUIV0.js
 *
 * Navigation window
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author redpolline
 */
define(function(require)
{
    'use strict';

    /**
     * Dependencies
     */
    var DB                 = require('DB/DBManager');
    var Configs            = require('Core/Configs');
    var PACKETVER          = require('Network/PacketVerManager');
    var Preferences        = require('Core/Preferences');
    var Renderer           = require('Renderer/Renderer');
    var UIManager          = require('UI/UIManager');
    var UIComponent        = require('UI/UIComponent');
    var htmlText           = require('text!./NavigationUIV0.html');
    var cssText            = require('text!./NavigationUIV0.css');

    var TARGET_TYPES = [
        { id:2206, name:'' },
        { id:2207, name:'' },
        { id:2208, name:'' },
        { id:2209, name:'' }
    ];

    /**
     * NavigationUIV0 namespace
     */
    var NavigationUIV0 = new UIComponent( 'NavigationUIV0', htmlText, cssText );

    /**
     * @var {Preference} window preferences
     */
    var _preferences = Preferences.get('NavigationUIV0', {
        x: 540,
        y: 320,
        show: false
    }, 1.0);

    var _resetstate = 0;

    NavigationUIV0.resetUI = function resetUI() {
        NavigationUIV0.init();
    }

    NavigationUIV0.getResetState = function getResetState() {
        return NavigationUIV0._resetstate;
    }

    /**
     * Initialize UI
     */
    NavigationUIV0.init = function init() {
        var ui = this.ui;

        // Apply preferences.
        this.ui.css({
            top: Math.min(Math.max(0, _preferences.y), Renderer.height - 358) / 2,
            left: Math.min(Math.max(0, _preferences.x), Renderer.width - 576) / 2
        });
        if (_preferences.show != this.ui.is(':visible')) {
            NavigationUIV0.toggle();
        }

        // Deactivate stopPropagation.
        ui.find('.titlebar .base').off('mousedown');

        // Don't activate drag drop when clicking on buttons
        ui.find('.titlebar .base').mousedown(stopPropagation);

	// Set buttons.
        this.ui.find('.close').on('click', onClickClose);

        this.draggable(ui.find('.titlebar'));

        // Init the combobox items.
        for (var i of TARGET_TYPES) {
            i.name = DB.getMessage(i.id);
        }
    };

    /**
     * Once append to body
     */
    NavigationUIV0.onAppend = function onAppend() {
        setComboBox();
    };

    /**
     * Stop rendering
     */
    NavigationUIV0.onRemove = function onRemove() {
        Renderer.stop();

	// Save preferences
	_preferences.show = this.ui.is(':visible');
	_preferences.y = parseInt(this.ui.css('top'), 10);
	_preferences.x = parseInt(this.ui.css('left'), 10);
	_preferences.save();
    };

    NavigationUIV0.toggle = function toggle() {
        this.ui.toggle();

        if (this.ui.is(':visible')) {
            Renderer.stop(render);
        } else {
            Renderer.render(render);
            NavigationUIV0.focus();
        }
    }

    NavigationUIV0.onShortCut = function onShortCut(key) {
        switch (key.cmd) {
          case 'TOGGLE':
            this.toggle();
            break;
        }
    }

    function setComboBox() {
        NavigationUIV0.ui.find("#TargetTypes").html(function(){
            let list = '';
            for (const map of TARGET_TYPES) {
                list += `<option value="${map.id}">${map.name}</option>`;
            }
            return list;
        });
    }

    function onClickClose() {
        NavigationUIV0.toggle();
    }

    /**
     * Stop an event to propagate
     */
    function stopPropagation(event) {
        event.stopImmediatePropagation();
        return false;
    }

    /**
     * Method to define
     */
    function render( tick ) {

    }

    /**
     * Create componentand export it
     */
    return UIManager.addComponent(NavigationUIV0);
});
