package com;

import com.alibaba.fastjson.JSONObject;
import jpcap.JpcapCaptor;
import jpcap.NetworkInterface;
import jpcap.PacketReceiver;
import jpcap.packet.Packet;

import java.io.IOException;
import java.util.ArrayList;

import com.alibaba.fastjson.JSON;


public class Capture {
	public static final NetworkInterface[] devices = JpcapCaptor.getDeviceList();
	public static NetworkInterface[] arr = new NetworkInterface[devices.length];
	public static JpcapCaptor jpcapCaptor;
	//public static
	public static void main(String[] args) {
	}
	public static void startCapture() {
		try {
	    	 jpcapCaptor = JpcapCaptor.openDevice(devices[0], 2000, false, 20);
	    	 jpcapCaptor.loopPacket(10, new NetFetcher());
	    	 //breakLoop
	     } catch (IOException e) {
	    	 // TODO Auto-generated catch block
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


class NetFetcher implements PacketReceiver{
	public static ArrayList<String> arrayList = new ArrayList<>();
	public static int j = 0; 
	@Override
	public void receivePacket(Packet arg0) {
		String jsonObject = JSON.toJSONString(arg0);
		//infoArr[j] = jsonObject;
		arrayList.add(jsonObject);
		//j++;
		//System.out.println(arrayList);
		//System.out.println(arg0);
	}
	public static String[] getInfoArr() {
		int len = arrayList.size();
		String infoArr[] = new String[len];
		for(int i = 0; i < len; i++) {
			infoArr[i] = arrayList.get(i);
		}
		return infoArr;
	}
}