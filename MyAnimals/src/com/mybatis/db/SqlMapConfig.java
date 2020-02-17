<<<<<<< HEAD:MyAnimals/src/com/member/dao/SqlMapConfig.java
=======
package com.mybatis.db;
>>>>>>> d59d556ba8a1d8c90d64d2e4ebc97e2984277fea:MyAnimals/src/com/mybatis/db/SqlMapConfig.java

package com.member.dao;
import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class SqlMapConfig {
	
	private SqlSessionFactory sqlSessionFactory;
	
	public SqlSessionFactory getSqlSessionFactory() {
		String resource = "com/mybatis/db/config.xml";
		
		Reader reader;
		try {
			reader = Resources.getResourceAsReader(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);

			reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return sqlSessionFactory;
	}

}
