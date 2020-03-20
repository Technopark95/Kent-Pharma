#include <iostream>
#include <algorithm>
#include <map>
#include <queue>
#include <conio.h>

using namespace std;


void seek( queue<int>tmp_q)  {
	
	cout << "Queue : ";
	int q_element;
	
	while (!tmp_q.empty())
{
    q_element = tmp_q.front();
    std::cout << q_element <<" ";
    tmp_q.pop();
} 
	
	
	
}

void swap (int &a , int &b) {
	
	
	int temp = a ;
	
	a = b;
	
	b = temp;
	
}

int largest(int arr[], int n) 
{ 
    int i; 
  
    int max = arr[0]; 
  
    for (i = 1; i < n; i++) 
        if (arr[i] > max) 
            max = arr[i]; 
  
    return max; 
} 


int main ()  {
	
	
	
	queue<int> ReadyQueue;
	
	enteragain:
	
	cout << "How many processes are there : ";
	
	int n;
	
	cin >> n;
	
	int pro[n], t_pro , sortedpro[n];
	
	int priority[n] , t_pri;
	
	int at[n] , t_at , sortedat[n];
	
	int bt[n] , t_bt;
	
	int lim = 0;

	
	for (int take = 0 ; take < n ; ++take)  {
		
		
		
		cout << "Enter the Process Priority : ";
		cin >> priority[take];
		
		cout << "Enter the Process Arrival time : ";
		cin >> at[take];
		
		cout << "Enter the process Burst time : ";
		cin >> bt[take];
		
		lim = lim + bt[take];
		
		pro[take] = take;
		
		
		cout << "\n\n";
		
	}
	
		bool signal = false;
	
	
	for (auto start : priority)  {
		
		if (start == 0 )  {
			signal = true;
			
			break;
		}
		
		
		
	}
	
	if (signal == false )  {
		
		cout << endl <<endl << "There is no processes with 0 priority.Please Re-enter your detail, make sure tjere must be atleast 1 process that have 0 priority.";
		getch();
	
		goto enteragain;
	}
	
	
	
	
	
	
	
	
	for (int i = 0 ; i < n ; ++i)   {
		
		
		for (int j = 0 ; j < n-1 ; ++j)  {
			if (priority[j] < priority[j+1])  {

				swap(priority[j] , priority[j+1]);
				
				swap(at[j] , at[j+1]);
			
				swap(bt[j] , bt[j+1]);
				
			}
						
		}	
		
	}
	
	
	
		for (int copy = 0 ; copy < n ; ++copy)  {
			
			
			sortedat[copy] = at[copy];
			
			sortedpro[copy] = pro[copy]; 
			

		}
		
		
		
		
	
	

	
	
	cout << "Enter the time quantum :  ";
	
	int quantum;
	
	cin >> quantum;
	
	
	int k =0;
	
	for (int i = 0 ; i < n ; ++i)   {
		
		
		for (int j = 0 ; j < n-1 ; ++j)  {
			
			
			if (sortedat[j] > sortedat[j+1]) {
				
				swap(sortedat[j] ,sortedat[j+1]);
				
				swap(sortedpro[j] , sortedpro[j+1]);
				
				
				
			}
			
		}
		
		
	
		
		
	}
	
	cout << endl;
	
	
		for (int i = 0 ; i < n ; ++i)   {
	
	cout << "Arrival : " << sortedat[i] << ", Process : " << sortedpro[i] <<endl;
	
	
}

getch();
	
	int elem;
	int maxburst = largest(bt , n);
	
	int o =1;
	
	int maintime =0;
	
	int flag = 0;
	int wt[n];
	
	ReadyQueue.push(sortedpro[0]);
	
	
	cout << endl;
	
	
	
	for ( ;lim != maintime; )  {
		
		// 3 5 0 3 4 1 7 3 2 5 2
		
		// 3 4 1 7 5 0 3 3 2 5 2
		
		// 3 5 4 3 4 0 7 3 2 5 2
		

		
		if (bt[ReadyQueue.front()] > quantum)  {
		
		
			bt[ReadyQueue.front()] -= quantum;
		
			maintime += quantum;
			
			flag = 2;
			
		}
		
	else if (bt[ReadyQueue.front()] == quantum) {
			
	
			bt[ReadyQueue.front()] = 0;
			
			maintime += quantum;
			
			flag = 1;
			wt[ReadyQueue.front()] = maintime;
			ReadyQueue.pop();
			
		}
		
		
		else {
			
		
			maintime += bt[ReadyQueue.front()];
		
			bt[ReadyQueue.front()] = 0;
			
			flag = 1;
			wt[ReadyQueue.front()] = maintime;
			ReadyQueue.pop();
			
		}
		
	
		for ( ; o < n ; ++o)  {
			
			if (maintime >= sortedat[o])  {	
			
				ReadyQueue.push(sortedpro[o]);	
			}
			
			else break;
			
			
		} 
		
		
		if (flag == 2)  {
			
			seek(ReadyQueue);
			cout <<"\n";
			ReadyQueue.push(ReadyQueue.front());
		  
			ReadyQueue.pop();
			seek(ReadyQueue);
		
				
		}
	
	
	
	cout << endl <<endl;
	for (int l = 0 ; l < n ;++l) {
		
		
		cout << "P: " <<l << " left with " << bt[l] <<endl <<endl;
		
	}
	
	
	
	
	
		
		getch();
		
		
		
		
	}
	
  
  
	
		for (int l = 0 ; l < n ;++l) {
		
		
		cout << "P :" <<pro[l] <<  << " waiting time " << wt[l] <<endl <<endl;
		
	}
	
	
}
