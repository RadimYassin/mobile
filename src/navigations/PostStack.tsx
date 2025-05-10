import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Post from '../screens/Post/PostScreen';
import { RootStackParamList } from '../types/RootStackParamList';
import PostDetails from '../screens/Post/PostDetails';
import CreateNewPost from '../screens/Post/NewPost';


const Stack = createStackNavigator<RootStackParamList>();

const PostStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Post" component={Post} options={
                { headerShown: false } // Hide the header for the Post screen
            } />
            <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Post Details' }} />
            <Stack.Screen name="NewPost" component={CreateNewPost} options={{ title: 'New Post' }} />
        </Stack.Navigator>
    );
};

export default PostStack;