# -*- coding: utf-8 -*-
from PIL import Image,ImageFont,ImageDraw
import time

def genImg():
	startTime=time.time()
	#加载背景图片
	background=Image.open(ur'template.jpg')
	#加载头像图片
	avatar = Image.open(ur'avatar.jpg')
	qrcode_img = Image.open(ur'qrcode.jpg')

	# 合并头像和背景图层
	back_img=circle(avatar,background)

	#将二维码图片粘贴在背景图片上
	region = qrcode_img
	region = region.resize((180, 180))
	back_img.paste(region,(230,860))

	#将用户昵称绘制在背景图片上
	font1 = ImageFont.truetype("simhei.ttf",32)
	drawImage=ImageDraw.Draw(back_img)
	drawImage.text((24, 66), unicode('慕蓉','utf-8'), font=font1)

	#绘制文字
	font2 = ImageFont.truetype("simhei.ttf",30)
	drawImage=ImageDraw.Draw(back_img)
	drawImage.text((498, 23), unicode('成长时间','utf-8'), font=font2)

	#绘制文字
	font3 = ImageFont.truetype("simhei.ttf",30)
	drawImage=ImageDraw.Draw(back_img)
	drawImage.text((560, 69), unicode('1024','utf-8'), font=font3)

	#绘制文字
	font4 = ImageFont.truetype("simhei.ttf",30)
	drawImage=ImageDraw.Draw(back_img)
	drawImage.text((560, 113), unicode('分钟','utf-8'), font=font4)

	#保存图片到文件
	back_img.save('output.jpg') #保存图片
	endTime=time.time()

	print endTime-startTime



"""
将头像变成圆形绘制在背景图片上，然后将合成的图片对象返回
"""
def circle(im,background):
	im = im.resize((170, 170));
	bigsize = (im.size[0] * 3, im.size[1] * 3)
	#遮罩对象
	mask = Image.new('L', bigsize, 0)
	draw = ImageDraw.Draw(mask) 
	draw.ellipse((0, 0) + bigsize, fill=255)
	mask = mask.resize(im.size, Image.ANTIALIAS)
	im.putalpha(mask)
	background.paste(im, (235, 155), im)
	return background



genImg()