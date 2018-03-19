"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function (window, undefined) {
    var
    //id前缀 避免isfu
    idPrefix = Math.random().toString().replace(".", "") + "_",


    // 字体设置
    fontFamilyOPtionStr = {
        "optionsStr": ''
    },
        fontFamilyOPtions = {
        1: '宋体',
        2: '黑体',
        3: '楷体',
        4: '隶书',
        5: '幼圆',
        6: '微软雅黑',
        7: 'Arial',
        8: 'Verdana',
        9: 'Georgia',
        10: 'Times New Roman',
        11: 'Trebuchet MS',
        12: 'Courier New',
        13: 'Impact',
        14: 'Comic Sans MS'
    },


    //颜色配置
    colorOptionsStr = {
        "optionsStr": ''
    },
        bgColorOptionsStr = {
        "optionsStr": ''
    },
        colorOptions = {
        red: '红色',
        blue: '蓝色',
        green: '绿色',
        yellow: '黄色',
        black: '黑色',
        gray: '灰色',
        white: '白色'
    },


    //字号设置
    fontsizeOptionsStr = {
        "optionsStr": ''
    },
        fontsizeOptions = {
        1: '10px',
        2: '13px',
        3: '16px',
        4: '19px',
        5: '22px',
        6: '25px',
        7: '28px'
    };
    //字号列表
    function creatli(str, opts, prop) {
        var index = 1;
        for (var item in opts) {
            if (Object.hasOwnProperty.call(opts, item)) {
                var valueForLoop = opts[item];
                if (opts === fontsizeOptions) {
                    str.optionsStr += "<li><a href=\"#\" data-font-size=\"" + index + "\" style=\"" + prop + ": " + valueForLoop + "\">" + valueForLoop + "</a></li>";
                    index++;
                } else if (opts === colorOptions && str === colorOptionsStr) {
                    str.optionsStr += "<li><a href=\"#\"  style=\"" + prop + ": " + item + "\">" + valueForLoop + "</a></li>";
                } else if (opts === colorOptions && str === bgColorOptionsStr) {
                    str.optionsStr += "<li><a href=\"#\"  style=\"" + prop + ": " + item + "; color:white\">" + valueForLoop + "</a></li>";
                } else {
                    str.optionsStr += "<li><a href=\"#\" style=\"" + prop + ": " + valueForLoop + "\">" + valueForLoop + "</a></li>";
                }
            }
        }
        return str;
    }
    var obj = {
        "fontsize": [fontsizeOptionsStr, fontsizeOptions, "font-size"],
        "color": [colorOptionsStr, colorOptions, "color"],
        "bgColor": [bgColorOptionsStr, colorOptions, "background-color"],
        "fontFamily": [fontFamilyOPtionStr, fontFamilyOPtions, "font-family"]
    };
    for (var o in obj) {
        var _obj$o = _slicedToArray(obj[o], 3),
            val1 = _obj$o[0],
            val2 = _obj$o[1],
            val3 = _obj$o[2];

        creatli(val1, val2, val3);
    }

    jQuery.fn.extend({
        wpcEditor: function wpcEditor(options) {
            var $menuContainer = $('<div></div>'),
                $menuToolbar = $('<div class="btn-toolbar" ></div>'),


            /*
            模板方法 生成一个button标签
            title:button标题
            iconClass: button中的图标样式
            sDropdown: 是否关联下来菜单
            modalTarget: 弹出层的id
            btnContent: 自定义button内部的内容，取代 <i icon>
             */
            btnTemp = function btnTemp(title, iconClass, isDropdown, modalTarget, btnContent) {
                var temp = '',
                    btnClass = 'btn btn-default-wpccustom';

                if (!title || typeof title !== 'string') throw new Error('btnTemp：必须传入title参数，而且title必须是字符串类型！');
                if ((!iconClass || typeof iconClass !== 'string') && !btnContent) throw new Error('btnTemp：必须传入iconClass参数，而且iconClass必须是字符串类型！');
                if (modalTarget && typeof modalTarget !== 'string') throw new Error('btnTemp：传入的modalTarget参数必须是字符串类型！');
                isDropdown = !!isDropdown;
                if (isDropdown) btnClass = "btn btn-default-wpccustom dropdown-toggle ";

                temp += "<button type=\"button\" title=\"" + title + "\" class=\"" + btnClass + "\"";

                //下拉
                if (isDropdown) temp += " data-toggle=\"dropdown\" ";

                //弹窗
                if (modalTarget) temp += " data-toggle=\"modal\" data-target=\"" + modalTarget + "\" ";

                temp += ">";
                // button 内容
                if (iconClass && typeof iconClass === 'string') temp += "<i class=\"" + iconClass + "\"></i>";
                if (btnContent && typeof btnContent === 'string') temp += btnContent;

                if (isDropdown) temp += "<span class=\"caret\"></span>";

                temp += "</button> ";
                return temp;
            },


            //模板方法：生成dropdown menu ul
            // headerText: 标题
            // content: 菜单内容
            dropDownMuneTemp = function dropDownMuneTemp(headerText, context) {
                //验证
                if (!context || typeof context !== 'string') {
                    throw new Error('dropdownMenuTemp：context参数不能为空，且必须为字符串类型！');
                }

                var temp = '';
                temp += "<ul class=\"dropdown-menu\">";
                if (headerText && typeof headerText === 'string') temp += "<li class=\"nav-header\">" + headerText + " </li>";
                if (context && typeof context === 'string') temp += context;
                temp += "</ul>";
                return temp;
            };

            var barJson = {
                opts: [{
                    'toolname': '加粗',
                    'toolclass': 'icon-bold',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }, {
                    'toolname': '斜体',
                    'toolclass': 'icon-italic',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }, {
                    'toolname': '下划线',
                    'toolclass': 'icon-underline',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }, {
                    'toolname': '字号',
                    'toolclass': 'icon-text-height',
                    'isDrop': true,
                    'isModal': false,
                    'btnContent': null,
                    'dropMune': {
                        'dropProp': 'font-size',
                        'title': '字号：',
                        'tempStr': fontsizeOptionsStr.optionsStr
                    }
                }, {
                    'toolname': '字体',
                    'toolclass': 'icon-font',
                    'isDrop': true,
                    'isModal': false,
                    'btnContent': null,
                    'dropMune': {
                        'dropProp': 'font-family',
                        'title': '字体：',
                        'tempStr': fontFamilyOPtionStr.optionsStr
                    }
                }, {
                    'toolname': '字体颜色：',
                    'toolclass': 'icon-mycolor',
                    'isDrop': true,
                    'isModal': false,
                    'btnContent': '<b style="color:#cb0007;">A</b>',
                    'dropMune': {
                        'dropProp': 'font-color',
                        'title': '字体颜色：',
                        'tempStr': colorOptionsStr.optionsStr
                    }
                }, {
                    'toolname': '背景颜色：',
                    'toolclass': 'icon-mybycolor',
                    'isDrop': true,
                    'isModal': false,
                    'btnContent': '<b style="background-color:#f2f917;color:white;">&nbsp;A&nbsp;</b>',
                    'dropMune': {
                        'dropProp': 'bg-color',
                        'title': '背景颜色：',
                        'tempStr': bgColorOptionsStr.optionsStr
                    }
                }, {
                    'toolname': '有序列表',
                    'toolclass': 'icon-list-ol',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }, {
                    'toolname': '无序列表',
                    'toolclass': 'icon-list-ul',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }, {
                    'toolname': '左对齐',
                    'toolclass': 'icon-align-left',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }, {
                    'toolname': '居中',
                    'toolclass': 'icon-align-center',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }, {
                    'toolname': '右对齐',
                    'toolclass': 'icon-align-right',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }, {
                    'toolname': '链接',
                    'toolclass': 'icon-link',
                    'isDrop': false,
                    'isModal': "#linkModalId",
                    'btnContent': null
                }, {
                    'toolname': '删除链接',
                    'toolclass': 'icon-remove',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }, {
                    'toolname': '插入图片',
                    'toolclass': 'icon-picture',
                    'isDrop': false,
                    'isModal': "#imgModalId",
                    'btnContent': null
                }, {
                    'toolname': '撤销',
                    'toolclass': 'icon-undo',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }, {
                    'toolname': '恢复',
                    'toolclass': 'icon-repeat',
                    'isDrop': false,
                    'isModal': false,
                    'btnContent': null
                }]
            };
            var btnTempMap = new Map();
            var dropDownTempMap = new Map();
            barJson.opts.forEach(function (barItem, index) {
                var $btnGroup = $('<div class="dropdown"></div>');
                var btn = btnTemp(barItem.toolname, barItem.toolclass, barItem.isDrop, barItem.isModal, barItem.btnContent);
                var $btn = $(btn);
                $btnGroup.append($btn);
                btnTempMap.set(barItem.toolclass, $btn);

                if (barItem.isDrop) {
                    var ulTemp = dropDownMuneTemp(barItem.dropMune.title, barItem.dropMune.tempStr);
                    var $ulTemp = $(ulTemp);
                    $btnGroup.append($ulTemp);
                    dropDownTempMap.set(barItem.dropMune.dropProp, $ulTemp);
                }
                $menuToolbar.append($btnGroup);
            });

            $menuContainer.append($menuToolbar);

            //menu modal===================================================start
            var $menuModal = $('<div></div>');
            var modalTemp = function modalTemp(id, title, bodyContents, footerContents) {
                //验证
                if (!id || typeof id !== 'string') {
                    throw new Error('modalTemp: id参数不能为空，且必须为字符串类型');
                }
                if (!title || typeof title !== 'string') {
                    throw new Error('modalTemp: title参数不能为空，且必须为字符串类型');
                }

                var i = void 0,
                    modalTemp = "<div id=\"" + id + "\" class=\"modal fade\">\n                                    <div class=\"modal-dialog\" role=\"document\">\n                                    <div class=\"modal-content\"> \n                                    </div>\n                                    </div>\n                                </div>",
                    modal = $(modalTemp),
                    modalTitleTemp = "<div class=\"modal-header\">\n                      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                      <h4>" + title + " </h4>\n                      </div>",
                    modalTitle = $(modalTitleTemp),
                    modalFooter = $('<div class="modal-footer">');

                modal.find('.modal-content').append(modalTitle);
                if (bodyContents) {

                    modal.find('.modal-content').append(bodyContents);

                    // modal.find('.modal-content').append(modalBody); //插入body
                }
                if (footerContents) {

                    modalFooter.append(footerContents);

                    modal.find('.modal-content').append(modalFooter); //插入footer
                }
                return modal;
            },


            //menu modal===================================================end
            //插入链接 modal
            $linkModal = void 0,

            //插入图片 modal
            $imgModal = void 0,


            //iframe container==========================================start

            iframeHeight = options.frameHeight || '600px',
                iframeContanerTemp = "<div style=\"width: 100%; height: " + iframeHeight + "; border: 1px solid #cccccc;\"> </div>",
                $iframeContainer = $(iframeContanerTemp),
                $iframe = $('<iframe frameborder="0" width="100%" height="100%"></iframe>'),
                initWords = options.initWords || '请输入...',
                _nodata = $iframeContainer.append($iframe),
                iframeWindow = void 0,
                $iframeWindow = void 0,
                iframeDocument = void 0,
                $iframeDocument = void 0,
                $codeTarget = void 0,


            //记录当前选择的内容，有时需要恢复
            currentSelectionData = void 0;

            //iframe container==========================================end

            //插入menu modal ==================================start
            //插入链接 modal
            var linkModalBodyContents = "\n                    <p>\u94FE\u63A5\u5730\u5740\uFF1A</p>\n                    <input type=\"text\" class=\"form-control\" placeholder=\"http(s)://\" class=\"input-block-level\"/>\n                    <p>\u94FE\u63A5\u76EE\u6807\uFF1A</p>\n                    <select><option>_blank</option><option>_self</option></select>\n                ";
            var $linkModalBody = $("<div class='modal-body'>");
            $linkModalBody.append(' <p>链接地址：</p>');
            var $linkModalInput = $("<input type=\"text\" class=\"form-control\" placeholder=\"http(s)://\" class=\"input-block-level\"/>");
            $linkModalBody.append($linkModalInput);
            $linkModalBody.append('<p>链接目标：</p>');
            var $linkModalBody_sltTarget = $('<select><option>_blank</option><option>_self</option></select>');
            $linkModalBody.append($linkModalBody_sltTarget);
            var $linkModalfooterContents = $("<a href=\"#\" class=\"btn btn-active-wpccustom\">\u63D2\u5165\u94FE\u63A5</a>");

            $linkModal = modalTemp("linkModalId", '插入链接', $linkModalBody, $linkModalfooterContents);

            //插入图片 modal
            var imgModalBodyContents = "\n                    <p>\u8F93\u5165\u56FE\u7247URL\u5730\u5740\uFF1A</p>\n                    <input type=\"text\" class=\"form-control\" placeholder=\"http(s)://\" class=\"input-block-level\"/>\n                ";
            var $imgModalBody = $("<div class='modal-body'>");
            $imgModalBody.append(' <p>输入图片URL地址：</p> ');
            var $imgModalInput = $('<input type="text" class="form-control" placeholder="http(s)://" class="input-block-level"/>');
            $imgModalBody.append($imgModalInput);

            var $imgModalFooterContents = $("<a href=\"#\" class=\"btn btn-active-wpccustom\">\u63D2\u5165</a>");
            $imgModal = modalTemp("imgModalId", "插入图片", $imgModalBody, $imgModalFooterContents);
            $menuModal.append($linkModal).append($imgModal);
            $menuContainer.append($menuModal);
            this.append($menuContainer);
            this.append($iframeContainer);
            //插入menu modal ==================================end

            //配置 iframe ==================================start
            iframeWindow = $iframe[0].contentWindow;
            $iframeWindow = $(iframeWindow);
            iframeDocument = iframeWindow.document;
            $iframeDocument = $(iframeDocument);
            iframeDocument.open();
            iframeDocument.write("\n                <!DOCTYPE html>\n                <html>\n                <head>\n                <title></title>\n                <body><p>" + initWords + "</p></body>\n</head>\n</html>\n              ");

            iframeDocument.close();
            // 控制整个文档是否可编辑
            iframeDocument.designMode = 'on';
            window.onload = function () {
                if (iframeDocument.designMode.toLowerCase() === 'off') iframeDocument.designMode = 'on';
            };

            //获取iframe中的代码，保存到options.codeTargetId中
            var saveIframeCode = function saveIframeCode() {
                //为啥要判断$codeTarget
                if (!$codeTarget) {
                    if (!options || !options.codeTargetId || typeof options.codeTargetId !== 'srting') return;

                    var _$target = $('#' + options.codeTargetId);
                    if (_$target.length === 0) {
                        return;
                    }
                }

                if ($target[0].nodeName.toLowerCase() === 'input') $target.val(iframeDocument.body.innerHTML);else $target.text(iframeDocument.body.innerHTML);
            };
            $iframeWindow.blur(saveIframeCode);

            //配置 iframe ==================================end

            //监听选中文字的样式=============================start

            var $menuBold = $(btnTempMap.get('icon-bold')),
                $menuItalic = $(btnTempMap.get('icon-italic')),
                $menuUnderline = $(btnTempMap.get('icon-underline')),
                $menuRemoveLink = $(btnTempMap.get('icon-remove')),
                $menuAlignLeft = $(btnTempMap.get('icon-align-left')),
                $menuAlignCenter = $(btnTempMap.get('icon-align-center')),
                $menuAlignRight = $(btnTempMap.get('icon-align-right')),
                $menuOrderedList = $(btnTempMap.get('icon-list-ol')),
                $menuUnorderedList = $(btnTempMap.get('icon-list-ul')),
                $menuUndo = $(btnTempMap.get('icon-undo')),
                $menuRedo = $(btnTempMap.get('icon-repeat')),
                $dropdownMenuFontColor = $(dropDownTempMap.get('font-color')),
                $dropdownMenuBgColor = $(dropDownTempMap.get('bg-color')),
                $dropdownMenuFontFamily = $(dropDownTempMap.get('font-family')),
                $dropdownMenuFontsize = $(dropDownTempMap.get('font-size'));

            console.log("$dropdownMenuFontColor" + $dropdownMenuFontColor.html());
            console.log("$dropdownMenuBgColor" + $dropdownMenuBgColor.html());

            console.log(_typeof(btnTempMap.get('icon-bold')));

            function iframeListener(e) {
                var eType = e.type,
                    kCode = e.keyCode,
                    keyForMoveCursor = false,
                    kCodes = [33, 34, 35, 36, 37, 38, 39, 40];
                keyForMoveCursor = eType === 'keyup' && kCodes.indexOf(kCode) !== -1;
                if (eType !== 'click' && !keyForMoveCursor) {
                    //只监听鼠标点击和[33, 34, 35, 36, 37, 38, 39, 40]这几个键，其他的不监听
                    return;
                }

                //是否加粗
                if (iframeDocument.queryCommandState('bold')) btnTempMap.get('icon-bold').addClass('btn-active-wpccustom');else $(btnTempMap.get('icon-bold')).removeClass('btn-active-wpccustom');

                //是否斜体
                if (iframeDocument.queryCommandState('italic')) btnTempMap.get('icon-italic').addClass('btn-active-wpccustom');else btnTempMap.get('icon-italic').removeClass('btn-active-wpccustom');

                //是否下划线
                if (iframeDocument.queryCommandState('underline')) btnTempMap.get('icon-underline').addClass('btn-active-wpccustom');else btnTempMap.get('icon-underline').removeClass('btn-active-wpccustom');

                //左对齐
                if (iframeDocument.queryCommandState('JustifyLeft')) btnTempMap.get('icon-align-left').addClass('btn-active-wpccustom');else btnTempMap.get('icon-align-left').removeClass('btn-active-wpccustom');

                //居中
                if (iframeDocument.queryCommandState('JustifyCenter')) btnTempMap.get('icon-align-center').addClass('btn-active-wpccustom');else btnTempMap.get('icon-align-center').removeClass('btn-active-wpccustom');

                //右对齐
                if (iframeDocument.queryCommandState('JustifyRight')) btnTempMap.get('icon-align-right').addClass('btn-active-wpccustom');else btnTempMap.get('icon-align-right').removeClass('btn-active-wpccustom');
                //记录当前的选择内容
                currentSelectionData = iframeDocument.getSelection().getRangeAt(0);
            }

            //添加事件监听
            $iframeDocument.click(iframeListener);
            $iframeDocument.keyup(iframeListener);
            //监听选中文字的样式=============================end


            //菜单操作 =========================================start
            $menuBold.click(function () {

                iframeDocument.execCommand("Bold", true, null);
                if (iframeDocument.queryCommandState('bold')) {
                    $menuBold.addClass('btn-active-wpccustom');
                } else {
                    $menuBold.removeClass('btn-active-wpccustom');
                }
            });
            $menuItalic.click(function () {
                iframeDocument.execCommand('italic');

                if (iframeDocument.queryCommandState('italic')) {
                    $menuItalic.addClass('btn-active-wpccustom');
                } else {
                    $menuItalic.removeClass('btn-active-wpccustom');
                }
            });

            $menuUnderline.click(function () {
                iframeDocument.execCommand('Underline');

                if (iframeDocument.queryCommandState('Underline')) {
                    $menuUnderline.addClass('btn-active-wpccustom');
                } else {
                    $menuUnderline.removeClass('btn-active-wpccustom');
                }
            });
            $dropdownMenuFontColor.find('a').each(function () {
                var menuColor = $(this),
                    colorVal = this.style.color;

                menuColor.click(function (e) {
                    console.log("colorVal: " + colorVal);
                    iframeDocument.execCommand('foreColor', false, colorVal);
                    e.preventDefault();
                });
            });
            //背景色
            $dropdownMenuBgColor.find('a').each(function () {
                var menuBgColor = $(this),
                    value = this.style.backgroundColor;
                menuBgColor.click(function (e) {
                    iframeDocument.execCommand('backColor', false, value);
                    e.preventDefault();
                });
            });
            //字体
            $dropdownMenuFontFamily.find('a').each(function () {
                var menuFamily = $(this),
                    value = menuFamily.css('font-family');
                menuFamily.click(function (e) {
                    iframeDocument.execCommand('FontName', false, value);
                    e.preventDefault();
                });
            });
            //字号
            $dropdownMenuFontsize.find('a').each(function () {
                var menuFontSize = $(this),
                    value = menuFontSize.attr('data-font-size');
                console.log("字号" + value);
                menuFontSize.click(function (e) {
                    iframeDocument.execCommand('FontSize', false, value);
                    e.preventDefault();
                });
            });

            //插入链接
            $linkModalfooterContents.click(function (e) {
                var selection = iframeDocument.getSelection();
                var url = $linkModalInput.val();
                var target = $linkModalBody_sltTarget.val();
                //恢复当前选择的内容 ???
                if (!selection || selection.anchorOffset === 0) {
                    selection.removeAllRanges();
                    selection.addClass(currentSelectionData);
                }

                iframeDocument.execCommand('createLink', false, url);
                e.preventDefault();
                $linkModal.modal('hide');
            });

            $menuRemoveLink.click(function () {
                iframeDocument.execCommand("unlink");
            });

            //插入图片
            $imgModalFooterContents.click(function (e) {
                var selection = iframeDocument.getSelection();
                var url = $imgModalInput.val();
                //恢复当前的选择内容（for IE,Opera） ???
                if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(currentSelectionData);
                }
                iframeDocument.execCommand('insertImage', false, url);
                e.preventDefault();
                $imgModal.modal('hide');
            });

            //左对齐
            $menuAlignLeft.click(function () {
                iframeDocument.execCommand('JustifyLeft');
                if (iframeDocument.queryCommandState('JustifyLeft')) $menuAlignLeft.addClass('btn-active-wpccustom');else $menuAlignLeft.removeClass('btn-active-wpccustom');
            });

            //居中
            $menuAlignCenter.click(function () {
                iframeDocument.execCommand('JustifyCenter');

                if (iframeDocument.queryCommandState('JustifyCenter')) {
                    $menuAlignCenter.addClass('btn-active-wpccustom');
                } else {
                    $menuAlignCenter.removeClass('btn-active-wpccustom');
                }
            });
            //右对齐
            $menuAlignRight.click(function () {
                iframeDocument.execCommand('JustifyRight');

                if (iframeDocument.queryCommandState('JustifyRight')) {
                    $menuAlignRight.addClass('btn-active-wpccustom');
                } else {
                    $menuAlignRight.removeClass('btn-active-wpccustom');
                }
            });
            //列表
            $menuOrderedList.click(function () {
                iframeDocument.execCommand('InsertOrderedList');
            });

            $menuUnorderedList.click(function () {
                iframeDocument.execCommand('InsertUnorderedList');
            });
            //撤销
            $menuUndo.click(function () {
                iframeDocument.execCommand('Undo');
            });
            $menuRedo.click(function () {
                iframeDocument.execCommand('Redo');
            });

            //及时记录code变化
            $menuContainer.click(function () {
                saveIframeCode();
            });
        }

    });
})(window);
//# sourceMappingURL=main.js.map