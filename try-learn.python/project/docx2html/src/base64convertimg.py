# -*- coding:utf-8 -*-
import re
import base64
class Base64ConvertImg(object):
	"""
	��ȡhtml�ļ�
	"""
	BASEIMAGESRC="E:\\imagssss\\";
	def __init__(self,fileName):
		self.fileName=fileName
		self.img=0;
		self.imgArr=[];
		self.index=0;

	def read_html(self):
		with open(self.fileName,'r') as f:
			self.val=f.read();
			self.write_img_element()

	def write_img_element(self):
		#����img��ǩ
		match_img_re=re.compile(r'<img .*?/>')
		#��ȡimg��ǩ��src��ֵ
		match_img_data=re.compile(r'src="(.+?)"')
		match_img_data.sub("",self.val)
		for img in match_img_re.findall(self.val):
			with open('abc.txt','w+') as f:
				#ÿ��ͼƬ�ڵ��src��ֵ
				imgDatas=match_img_data.search(img).group().replace("src=\"","").replace("\"","")
				#����ͼƬ��ַ
				imgSrc=str(self.img+1)
				self.img+=1
				#��ȡdata��ͼƬ�ĺ�׺��
				imgSrc=Base64ConvertImg.BASEIMAGESRC+imgSrc+"."+imgDatas.split(";")[0].replace("data:image/","");
				#base64ͼƬ����
				imgData=imgDatas.split(";")[1].replace("base64,","")
				#д���ļ�
				self.wirte_img(imgSrc,imgData);
				self.imgArr.append(imgSrc)
		
	def replace_img_element(self):
		print self.imgArr
		match_img_data=re.compile(r'src="(.+?)"')
		abcdasdasd=match_img_data.sub(self.mark,self.val)
			
		with open("e:\\abc.html","w") as f:
			f.write(abcdasdasd)
		
	def mark(self,m):
		src="src='"+self.imgArr[self.index]+"'";
		self.index=self.index+1
		return src

	#base64ͼƬд���ļ�
	def wirte_img(self,src,data):
		imgData = base64.b64decode(data)
		leniyimg = open(src,'wb')
		leniyimg.write(imgData)
		leniyimg.close()

bci=Base64ConvertImg("e:\\index_test.html");
bci.read_html()
bci.replace_img_element()