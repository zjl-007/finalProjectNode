package com;

import jpcap.JpcapCaptor;
import jpcap.NetworkInterface;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;;

public class Capture {
	public static final NetworkInterface[] devices = JpcapCaptor.getDeviceList();
	public static NetworkInterface[] arr = new NetworkInterface[devices.length];
	public static JpcapCaptor jpcapCaptor;
	//public static
	public static void main(String[] args) {
//		Capture.startCapture(10);
	}
	
	public void startCapture(int count) {
		try {
			NetFetcher.isCaptureing = true;
	    	 jpcapCaptor = JpcapCaptor.openDevice(devices[0], 2000, false, 20);
	    	 jpcapCaptor.setFilter("ip", true);
//	    	 jpcapCaptor.setFilter("dst host 192.168.1.126", true);
//	    	 jpcapCaptor.setFilter("ip and tcp and dst port 80", true);
	    	 jpcapCaptor.loopPacket(count, new NetFetcher("ip", count));
	         System.out.println(NetFetcher.isCaptureing);
	     } catch (IOException e) {
	    	 e.printStackTrace();
	 		NetFetcher.isCaptureing = false;
	     }
	}
	
	public void stopCapture(Thread captureThread) {
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		Capture.jpcapCaptor.close();
		NetFetcher.isCaptureing = false;
		NetFetcher.currentPack = 0;
	}
	public String[] getCpatureInfo() {
		return NetFetcher.getInfoArr();
	}
	
	public String[] getDevicesInfo() {
		List<Map<String, Object>> list = NetFetcher.devices();
		int len = NetFetcher.devices().size();
		String infoArr[] = new String[len];
		for(int i = 0; i < len; i++) {
//			infoArr[i] = list.get(i).toString();
			infoArr[i] = JSON.toJSONString(list.get(i));
		}
		list.clear();
		return infoArr;
	}
}
