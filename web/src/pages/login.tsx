import React, { useState, FormEvent } from 'react';
import { useMutation } from 'urql';
import { LoginDocument } from '@/gql/graphql';
import { useRouter } from 'next/router';

interface loginProps {}

const Login = (props: loginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [_, login] = useMutation(LoginDocument.toString());

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await login({options: {username, password}});
    if (response.data?.login.errors) {
      //develop user error            
    } else if (response.data?.login.user) {
      router.push('/');
    }
  };
  
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label 
          htmlFor="username" 
          className="block mb-2 text-sm font-medium text-gray-900 dark:stext-white"
        >
          Username
        </label>
        <input 
          type="text" 
          id="username" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          onChange={e => setUsername(e.target.value)}      
          required 
        />
      </div>
      <div className="mb-6">
        <label 
          htmlFor="password" 
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input 
          type="password" 
          id="password" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          onChange={e => setPassword(e.target.value)}      
          required 
        />
      </div>
      <button 
        type="submit" 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
