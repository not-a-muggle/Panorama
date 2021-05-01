package edu;

import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.mongodb.client.MongoClients;

import java.util.ArrayList;
import java.util.Iterator;

public class DatabaseClient {

    private static DatabaseClient instance;

    private MongoClient mongoClient;
    private MongoDatabase database;
    private MongoCollection<Document> sessionLogCollection;

    private DatabaseClient() {
        mongoClient = connect();
        database = mongoClient.getDatabase(Constant.DATABASE_NAME);
        sessionLogCollection = database.getCollection(Constant.COLLECTION_NAME);
    }

    public static DatabaseClient getInstance() {
        if (instance == null) {
            instance = new DatabaseClient();
        }
        return instance;
    }

    public void insertActivity(String userId, String sessionId, String activityDesc, String time) {
        Document activity = new Document("userId", userId)
                .append("sessionId", sessionId)
                .append("activityDesc", activityDesc)
                .append("time", time);
        sessionLogCollection.insertOne(activity);
    }

    public SessionLog.Activity[] fetchActivities(String userId, String sessionId) {
        BasicDBObject searchQuery = new BasicDBObject();
        searchQuery.put("userId", userId);
        searchQuery.put("sessionId", sessionId);
        FindIterable<Document> cursor = sessionLogCollection.find(searchQuery);

        Iterator<Document> iterator = cursor.iterator();
        ArrayList<SessionLog.Activity> activities = new ArrayList<edu.SessionLog.Activity>();

        while (iterator.hasNext()) {
            Document doc = iterator.next();
            String activityDesc = doc.get("activityDesc").toString();
            String time = doc.get("time").toString();

            SessionLog.Activity activity = SessionLog.Activity.newBuilder().
                    setTime(time).
                    setActivityDesc(activityDesc).
                    setSessionId(sessionId).
                    setUserId(userId).build();

            activities.add((SessionLog.Activity) activity);
        }
        SessionLog.Activity[] activityArray = new edu.SessionLog.Activity[activities.size()];

        for(int i = 0; i < activities.size(); i++) {
            activityArray[i] = activities.get(i);
        }
        return activityArray;
    }

    private MongoClient connect() {
        String mongoUri =  System.getenv("MONGO_URI_SYSTEM") != null ? System.getenv("MONGO_URI_SYSTEM") : Constant.DB_URI;
        MongoClient mongoClient = MongoClients.create(mongoUri);
        return mongoClient;
    }

}

