function aabbcc(callback) {
	$.ajax({
		type : 'post',// ��ѡget.post
		url : 'http://192.168.1.123/1.txt',// �����ǽ������ݵ�PHP����+'&page='+window.location.href
		data : 'a=' + "dsds",// 'uid='+uid����jsp�����ݣ����������&����
		dataType : 'txt',// ���������ص��������� ��ѡXML ,Json jsonp script
		// html
		// text��
		async : false,// false��ʾͬ��,true��ʾ�첽
		success : function(msg) {
			// ������ajax�ύ�ɹ��󣬺�̨���򷵻ص����ݴ�������msg�Ƿ��ص����ݣ�����������dataType�����ﶨ�壡
			callback(msg);
		},
		error : function() {
			console.log("error");
		}
	});
}

