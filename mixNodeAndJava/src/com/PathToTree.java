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
	public static void main(String[] args) {
	    String test = "E:";
//	    System.out.println(test);
	   // System.out.println(fileToJSONObject(new File(test)));
	    //showJP();
	    //startCap();
}
	
	public static Object showJP() {
		final NetworkInterface[] devices = JpcapCaptor.getDeviceList();
		NetworkInterface[] arr = new NetworkInterface[devices.length];
		String address = "";
		String info = "";
		String infoArr[] = new String[devices.length];
		//System.out.println(devices.length);
		//System.out.println("我是SHOWJP");
		for(int i=0;i<devices.length;i++){   
		     NetworkInterface nc=devices[i];   
		     arr[i] = devices[i];
		     //一块卡上可能有多个地址:    
		     for(int t=0;t<nc.addresses.length;t++){   
		    	 address+="addresses["+t+"]: "+nc.addresses[t].address.toString();   
		     }
		     
		     info = "interface"+ i + nc.name +";loopback: "+nc.loopback+"; " + address;
		     address = "" ;
		     infoArr[i] = info;
		     try {
		    	 JpcapCaptor jpcapCaptor = JpcapCaptor.openDevice(devices[0], 2000, false, 20);

		    	 jpcapCaptor.loopPacket(10, new NetFetcher());
		    	 //breakLoop

		     } catch (IOException e) {
		    	 // TODO Auto-generated catch block

		    	 e.printStackTrace();

		     }
		 }
		return infoArr;
	}
	

	
	public static Object getInfoArr() {
		return NetFetcher.getInfoArr();
	}
	public static void startCap() {
		final NetworkInterface[] devices = JpcapCaptor.getDeviceList();
		NetworkInterface[] arr = new NetworkInterface[devices.length];
		try {
	    	 JpcapCaptor jpcapCaptor = JpcapCaptor.openDevice(devices[0], 2000, false, 20);

	    	 jpcapCaptor.loopPacket(10, new NetFetcher());
	    	 //breakLoop

	     } catch (IOException e) {
	    	 // TODO Auto-generated catch block

	    	 e.printStackTrace();

	     }
	}
}
class NetFetcher implements PacketReceiver{
	public static ArrayList<String> arrayList = new ArrayList<>();
	public static String infoArr[] = new String[100];
	public static int j = 0;
	@Override
	public void receivePacket(Packet arg0) {
		String jsonObject = JSON.toJSONString(arg0);
		infoArr[j] = jsonObject;
		arrayList.add(jsonObject);
		j++;
		//System.out.println(arrayList);
		//System.out.println(arg0);
	}
	public static ArrayList<String> getInfoArr() {
		return arrayList;
	}
}
	
