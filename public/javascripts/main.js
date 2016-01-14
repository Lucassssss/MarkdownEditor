$(function () {
	var editor = $(".editor");
	if (localStorage.con) {
		editor.val(localStorage.con); //获取本地内容
		var con = $(".editor").val();
		var view = markdown.toHTML(con);
		$("#view").html(view);
	} else {
		var con = $(".editor").val();
		var view = markdown.toHTML(con);
		$("#view").html(view);
	}
	editor.focus();
});

function bind() {
	$("#md_con").on("keyup", function () {
		var con = $(this).val();
		var view = markdown.toHTML(con);
		$("#view").html(view);
	});
}
bind();

//重新渲染
function review() {
	var con = $(".editor").val();
	var view = markdown.toHTML(con);
	$("#view").html(view);
}

//焦点定位
/*function po_Last(obj) {
            obj.focus();//解决ff不获取焦点无法定位问题
            if (window.getSelection) {//ie11 10 9 ff safari
                var max_Len=obj.value.length;//text字符数
                obj.setSelectionRange(max_Len, max_Len);
            }
            else if (document.selection) {//ie10 9 8 7 6 5
                var range = obj.createTextRange();//创建range
                range.collapse(false);//光标移至最后
                range.select();//避免产生空格
            }
        }*/

//保存
$(".J_save").on("click", function () {
	var con = $(".editor").val();
	console.log(con);
	localStorage.con = con; //本地存储
	/*$.ajax({
		type: "post",
		url: "",
		data: con,
		success: function() {
						
			},
		dataType: "html",
		erro: function() {
					
			}
	})*/
});
//导出PDF
$(".J_toPdf").on("click", function () {
	var con = $(".editor").val();
	var view = markdown.toHTML(con);

	var data = {};
	data.htmlCotent = view;
	
	//loading
	var index = layer.load(1, {
		shade: [0.1,'#fff'] //0.1透明度的白色背景
	});

	
	$.ajax({
		type: "POST",
		url: "/convert",
		data: JSON.stringify(data),
		contentType: "application/json",
		success: function (data) {
			//close loading
			layer.close(index); 
			console.log("../tmp/" + data.name + ".pdf")
			downloadFile(data.name + ".pdf", "/tmp/" + data.name + ".pdf");
		}
	})
});

//文件下载方法
function downloadFile(fileName, content){
    var aLink = document.createElement("a"),
        evt = document.createEvent("HTMLEvents");

    evt.initEvent("click");
    aLink.download = fileName;
    aLink.href = content;

    aLink.dispatchEvent(evt);
}

//滚动同步
var leftHeight = $(".view").scrollTop(); 
var rightHeight = $(".md_content").height();
console.log(leftHeight);

var view = $(".view");
var editor = $(".editor");

/*view.scroll(function() {
	view.scrollTop(editor.scrollTop);
})*/