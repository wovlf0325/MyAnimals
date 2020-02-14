package com.animalinfo.dao;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.animalinfo.dto.animalinfoDto;

public class animalinfoDaoImpl implements animalinfoDao {
	@Override
	public Map<String, String[]> selectAll() throws IOException {

		String[] gugun = LocationData.gugunNumber(0);

		int[] index = new int[gugun.length];
		String[] indexCount = new String[index.length];

		BufferedReader br = null;
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setNamespaceAware(true);
		DocumentBuilder builder;
		Document doc = null;
		try {
			String key = "ServiceKey=kq8LTv6iloXWHq9Ws0RpiSHKOiPP7yWgWS0LzU6MVbt9%2F%2Bfi1k%2B1b0j5H5SZ%2BryGctFPw5sUckfi3ZkVehwJgQ%3D%3D";
			String http = "http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?";
			URL url = new URL(http + "numOfRows=" + 9854 + "&" + key);

			HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();

			br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream()));
			String result = "";
			String line;

			while (((line = br.readLine()) != null)) {
				result += line.trim();
			}

			InputSource is = new InputSource(new StringReader(result));

			builder = factory.newDocumentBuilder();
			doc = builder.parse(is);
			XPathFactory xpathFactory = XPathFactory.newInstance();
			XPath xpath = xpathFactory.newXPath();
			XPathExpression expr = xpath.compile("//items/item");
			NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);

			for (int i = 0; i < nodeList.getLength(); i++) {
				NodeList child = nodeList.item(i).getChildNodes();

				for (int j = 0; j < child.getLength(); j++) {
					Node node = child.item(j);
					// xml데이터를 탐색하면서 원하는 값에 해당하는 데이터들을 dto담는다
					if (node.getNodeName().equals("orgNm")) {
						for (int k = 0; k < gugun.length; k++) {
							if (node.getTextContent().contains(gugun[k])) {
								index[k]++;
							}
						}
					}
				}
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		for (int i = 0; i < index.length; i++) {
			indexCount[i] = Integer.toString(index[i]);
		}
		Map<String, String[]> map = new HashMap<>();
		map.put("index", indexCount);
		map.put("gugun", gugun);
		return map;
	}

	@Override
	public Map<String, String[]> selectLocation(String sido) {

		int locationNumber = LocationData.sidoNumber(sido);
		String[] gugun = LocationData.gugunNumber(locationNumber);

		int[] index = new int[gugun.length];
		String[] indexCount = new String[index.length];

		BufferedReader br = null;
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setNamespaceAware(true);
		DocumentBuilder builder;
		Document doc = null;
		try {

			String key = "ServiceKey=kq8LTv6iloXWHq9Ws0RpiSHKOiPP7yWgWS0LzU6MVbt9%2F%2Bfi1k%2B1b0j5H5SZ%2BryGctFPw5sUckfi3ZkVehwJgQ%3D%3D";
			String http = "http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?upr_cd=";
			URL url = new URL(http + locationNumber + "&numOfRows=" + 10000 + "&" + key);

			HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();

			br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream()));
			String result = "";
			String line;

			while (((line = br.readLine()) != null)) {
				result += line.trim();
			}

			InputSource is = new InputSource(new StringReader(result));

			builder = factory.newDocumentBuilder();
			doc = builder.parse(is);
			XPathFactory xpathFactory = XPathFactory.newInstance();
			XPath xpath = xpathFactory.newXPath();
			XPathExpression expr = xpath.compile("//items/item");
			NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
			System.out.println(nodeList.getLength());
			for (int i = 0; i < nodeList.getLength(); i++) {
				NodeList child = nodeList.item(i).getChildNodes();
				for (int j = 0; j < child.getLength(); j++) {
					Node node = child.item(j);
					// xml데이터를 탐색하면서 원하는 값에 해당하는 데이터들을 dto담는다

					if (node.getNodeName().equals("orgNm")) {
						for (int k = 0; k < gugun.length; k++) {

							if (node.getTextContent().contains(gugun[k])) {
								index[k]++;
							}
						}
					}
				}
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		for (int i = 0; i < index.length; i++) {
			indexCount[i] = Integer.toString(index[i]);
		}
		Map<String, String[]> map = new HashMap<>();
		map.put("index", indexCount);
		map.put("gugun", gugun);
		return map;
	}

	@Override
	public Map<String, String[]> selectKindAll() {
		String[] animal = { "개", "고양이", "기타" };
		int[] index = { 0, 0, 0 };
		String[] indexCount = new String[3];

		BufferedReader br = null;
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setNamespaceAware(true);
		DocumentBuilder builder;
		Document doc = null;
		try {
			String key = "ServiceKey=kq8LTv6iloXWHq9Ws0RpiSHKOiPP7yWgWS0LzU6MVbt9%2F%2Bfi1k%2B1b0j5H5SZ%2BryGctFPw5sUckfi3ZkVehwJgQ%3D%3D";
			String http = "http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?";
			URL url = new URL(http + "numOfRows=" + 10000 + "&" + key);

			HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();

			br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream()));
			String result = "";
			String line;

			while (((line = br.readLine()) != null)) {
				result += line.trim();
			}

			InputSource is = new InputSource(new StringReader(result));

			builder = factory.newDocumentBuilder();
			doc = builder.parse(is);
			XPathFactory xpathFactory = XPathFactory.newInstance();
			XPath xpath = xpathFactory.newXPath();
			XPathExpression expr = xpath.compile("//items/item");
			NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);

			for (int i = 0; i < nodeList.getLength(); i++) {
				NodeList child = nodeList.item(i).getChildNodes();

				for (int j = 0; j < child.getLength(); j++) {
					Node node = child.item(j);
					// xml데이터를 탐색하면서 원하는 값에 해당하는 데이터들을 dto담는다
					if (node.getNodeName().equals("kindCd")) {
						for (int k = 0; k < 3; k++) {
							if (node.getTextContent().contains(animal[k])) {
								index[k]++;
							}
						}
					}
				}
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		for (int i = 0; i < index.length; i++) {
			indexCount[i] = Integer.toString(index[i]);
		}
		Map<String, String[]> map = new HashMap<>();
		map.put("index", indexCount);
		map.put("gugun", animal);
		return map;
	}

	@Override
	public Map<String, Integer> selectKindAnimal(String kind) {
		int upkind = LocationData.getKindUp(kind);
		BufferedReader br = null;
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setNamespaceAware(true);
		DocumentBuilder builder;
		Document doc = null;
		Map<String, Integer> map = new HashMap<>();
		try {
			String key = "ServiceKey=kq8LTv6iloXWHq9Ws0RpiSHKOiPP7yWgWS0LzU6MVbt9%2F%2Bfi1k%2B1b0j5H5SZ%2BryGctFPw5sUckfi3ZkVehwJgQ%3D%3D";
			String http = "http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?";
			URL url = new URL(http + "upkind=" + upkind + "numOfRows=" + 10000 + "&" + key);

			HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();

			br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream()));
			String result = "";
			String line;

			while (((line = br.readLine()) != null)) {
				result += line.trim();
			}

			InputSource is = new InputSource(new StringReader(result));

			builder = factory.newDocumentBuilder();
			doc = builder.parse(is);
			XPathFactory xpathFactory = XPathFactory.newInstance();
			XPath xpath = xpathFactory.newXPath();
			XPathExpression expr = xpath.compile("//items/item");
			NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
			
			
			for (int i = 0; i < nodeList.getLength(); i++) {
				NodeList child = nodeList.item(i).getChildNodes();

				for (int j = 0; j < child.getLength(); j++) {
					Node node = child.item(j);
					// xml데이터를 탐색하면서 원하는 값에 해당하는 데이터들을 dto담는다
					if (node.getNodeName().equals("kindCd")) {
						String res[] = node.getTextContent().split(" ");
						if(map.containsKey(res[1])==false) {
							map.put(res[1],1);
						}else {
							map.put(res[1],map.get(res[1]));
						}
					}
				}
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return map;
	}

}
