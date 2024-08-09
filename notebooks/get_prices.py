import requests

host_url = 'https://dolphin-app-unbpi.ondigitalocean.app/prices'
out_dir = './prices'


def download_parquets():

    data = requests.get(host_url + '/all').json()
    print(data)

    for asset, files in data.items():
        parquets = [f for f in files if f.endswith('.parquet')]
        print(f'{asset}: {parquets}')
        
        for pfile in parquets:
            response = requests.get(host_url + f'/file/{asset}/{pfile[:-8]}', stream=True)
    
            if response.status_code == 200:
                with open(f'{out_dir}/{asset}_{pfile}', 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                del_res = requests.get(host_url + f'/rm/{asset}/{pfile[:-8]}')
                print(f'File downloaded: {out_dir}; delete: {del_res.status_code}')
            else:
                print(f'Failed to download {asset} {pfile}: {response.status_code}')

download_parquets()