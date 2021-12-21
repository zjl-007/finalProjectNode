package com;

import jpcap.JpcapCaptor;
import jpcap.NetworkInterface;
import java.io.IOException;
import java.util.List;
import java.util.Map;;

public class Capture {
	public static final NetworkInterface[] devices = JpcapCaptor.getDeviceList();
	public static NetworkInterface[] arr = new NetworkInterface[devices.length];
	public static JpcapCaptor jpcapCaptor;
	//public static
	public static void main(String[] args) {
//		Capture.startCapture(10);
//		Capture.stopCapture();
//		System.out.println(NetFetcher.getInfoArr());
		System.out.println(Capture.getDevicesInfo() + "");
	}
	public static void startCapture(int count) {
		try {
	    	 jpcapCaptor = JpcapCaptor.openDevice(devices[0], 2000, false, 20);
	    	 jpcapCaptor.setFilter("ip", true);
	    	 jpcapCaptor.loopPacket(count, new NetFetcher("ip"));
	     } catch (IOException e) {
	    	 e.printStackTrace();
	     }
	}
	public static void stopCapture() {
		jpcapCaptor.breakLoop();
	}
	public static String[] getCpatureInfo() {
		return NetFetcher.getInfoArr();
	}
	
	public static String getDevicesInfo() {
		return NetFetcher.devices() + "";
	}
}
