package iu.iu;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import edu.DatabaseClient;
import edu.SessionLog;




public class AppTest 
{
    @Test
    public void sessionStoreAndRetrieveTest()
    {
        String userId = "1234";
        String sessionId = "Session123";
        String activityDesc = "Activity";
        String time = "1616551403";
        DatabaseClient databaseClient = DatabaseClient.getInstance();

        databaseClient.insertActivity(userId, sessionId, activityDesc, time);
        SessionLog.Activity activities[] = databaseClient.fetchActivities(userId, sessionId);
        String fetchedActivity = activities[0].getActivityDesc();
        String fetchedTime = activities[0].getTime();
        assertEquals(activityDesc, fetchedActivity );
        assertEquals(time, fetchedTime);
    }
}
