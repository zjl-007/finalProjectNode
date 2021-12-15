package com;

import com.alibaba.fastjson.JSONObject;
import jpcap.JpcapCaptor;
import jpcap.NetworkInterface;
import jpcap.PacketReceiver;
import java.io.IOException;;

public class Capture {
	public static final NetworkInterface[] devices = JpcapCaptor.getDeviceList();
	public static NetworkInterface[] arr = new NetworkInterface[devices.length];
	public static JpcapCaptor jpcapCaptor;
	//public static
	public static void main(String[] args) {
		Capture.startCapture();
		Capture.stopCapture();
		//System.out.println(Capture.getCpatureInfo());
		System.out.println(NetFetcher.getInfoArr());
	}
	public static void startCapture() {
		try {
	    	 jpcapCaptor = JpcapCaptor.openDevice(devices[0], 2000, false, 20);
	    	 
	    	 //System.out.println(JSON.toJSONString(devices[0]));
	    	 jpcapCaptor.setFilter("ip", true);
	    	 //IPPacket ip = (IPPacket) jpcapCaptor.getPacket();
	    	 
	    	 jpcapCaptor.loopPacket(10, new NetFetcher("ip"));
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
}


//class NetFetcher implements PacketReceiver{
//	public static ArrayList<String> arrayList = new ArrayList<>();
//	public static int j = 0; 
//	public static String packetType = "";
//	public NetFetcher(String type) {
//		NetFetcher.packetType = type;
//	}
//	@Override
//	public void receivePacket(Packet arg0) {
//		IPPacket ip = (IPPacket) arg0;
//		//System.out.println(JSON.toJSONString(ip));
//		System.out.println(JSON.toJSON(arg0));
//		System.out.println(ip.protocol);
//		String jsonObject = JSON.toJSONString(arg0);
//		arrayList.add(jsonObject);
//	}
//	public static String[] getInfoArr() {
//		int len = arrayList.size();
//		String infoArr[] = new String[len];
//		for(int i = 0; i < len; i++) {
//			infoArr[i] = arrayList.get(i);
//		}
//		return infoArr;
//	}
//}