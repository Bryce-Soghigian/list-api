import pandas as pd
#bring in csv
df = pd.read_csv("anime.csv",sep = ',')
arr = []
#loop through csv and add all the columns we want into an array
for i in range(len(df)):
    arr.append(df["title"].iloc[i])
    arr.append(df["title_english"].iloc[i])
    arr.append(df["title_japanese"].iloc[i])
    arr.append(df["title_synonyms"].iloc[i])
#intializing a new dataframe with those values
title_df = pd.DataFrame(arr)
#renaming the column from 0 to the value titles
title_df = title_df.rename({0:"titles"},axis="columns")
#dropping null/empty values and exporting the cleaned csv
title_df = title_df.dropna(axis=0,how="any",thresh=None, subset=None,inplace=False)
title_df.to_csv("merged_anime.csv")