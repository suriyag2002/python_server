import pandas as pd
import matplotlib.pyplot as plt


data = {
    'Year': [2018, 2019, 2020, 2021],
    'Sales': [100, 150, 200, 250]
}

#datafram 
df = pd.DataFrame(data)


plt.plot(df['Year'], df['Sales'], marker='o', color='blue', label='Sales Growth')
plt.title('Yearly Sales Growth')
plt.xlabel('Year')
plt.ylabel('Sales')
plt.legend()
plt.grid()
plt.show()
