//插入方法
function insertAtCursor(myField, myValue) {
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
		sel.select();
	} else if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		var restoreTop = myField.scrollTop;
		myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
		if (restoreTop > 0) {
			myField.scrollTop = restoreTop;
		}
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
	} else {
		myField.value += myValue;
		myField.focus();
	}
}

$(function () {
	/*  在textarea处插入文本--Start */
	(function ($) {
		$.fn
			.extend({
				insertContent: function (myValue, t) {
					var $t = $(this)[0];
					if (document.selection) { // ie
						this.focus();
						var sel = document.selection.createRange();
						sel.text = myValue;
						this.focus();
						sel.moveStart('character', -l);
						var wee = sel.text.length;
						if (arguments.length == 2) {
							var l = $t.value.length;
							sel.moveEnd("character", wee + t);
							t <= 0 ? sel.moveStart("character", wee - 2 * t - myValue.length) : sel.moveStart(
								"character", wee - t - myValue.length);
							sel.select();
						}
					} else if ($t.selectionStart || $t.selectionStart == '0') {
						var startPos = $t.selectionStart;
						var endPos = $t.selectionEnd;
						var scrollTop = $t.scrollTop;
						$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos,
							$t.value.length);
						this.focus();
						$t.selectionStart = startPos + myValue.length;
						$t.selectionEnd = startPos + myValue.length;
						$t.scrollTop = scrollTop;
						if (arguments.length == 2) {
							$t.setSelectionRange(startPos - t,
								$t.selectionEnd + t);
							this.focus();
						}
					} else {
						this.value += myValue;
						this.focus();
					}
				}
			})
	})(jQuery);
	/* 在textarea处插入文本--Ending */
});

var t = $(".editor");

//加粗
$(".bold").on("click", function () {
	t.insertContent("\n**粗体**\n");
	review();
});

//倾斜
$(".italic").on("click", function () {
	t.insertContent("\n*斜体*\n");
	review();
});

//引用
$(".blockquote").on("click", function () {
	t.insertContent("\n>引用的内容\n");
	review();
});

//超链接
$(".link").on("click", function () {
	t.insertContent("\n[链接文字] (http://www.example.com)\n");
	review();
});

//代码
$(".code").on("click", function () {
	
});

//图片
$(".image").on("click", function () {
	t.insertContent("\n![图片描述](https://www.npmjs.com/static/images/npm-logo.svg)\n");
	review();
});

//有序列表
$(".orderedlist").on("click", function () {
	t.insertContent("\n1. 有序列表\n");
	review();
});

//无序列表
$(".unorderedlist").on("click", function () {
	t.insertContent("\n* 无序列表\n");
	review();
});

