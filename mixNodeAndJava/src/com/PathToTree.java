package com;

//package com.cn.test;

import java.io.IOException;
import jpcap.PacketReceiver;
import jpcap.packet.Packet;
import java.util.ArrayList;
import java.util.List;
import com.alibaba.fastjson.JSONObject;
import jpcap.JpcapCaptor;
import jpcap.NetworkInterface;   
import com.alibaba.fastjson.JSON;
public class PathToTree {
	public static Capture capture = new Capture();
	public static Thread captureThread =  null;
	public static void main(String[] args) {
		System.out.println("ok`````");
    }
	
	
	public static String startCapture(int count) {
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
            	capture.startCapture(count);
            }
        };
        captureThread = new Thread(runnable);
		if(NetFetcher.isCaptureing) {
			return "正在抓包中,请勿重复抓包！";
		}
        captureThread.start();
        return "开始抓包";
	}
	
	public static void stopCapture() {
		capture.stopCapture(captureThread);
	}
	
	public static String[] getCaptureResult() {
		return capture.getCpatureInfo();
	}
	public static String[] getDevicesInfo() {
		return capture.getDevicesInfo();
	}
}
	
