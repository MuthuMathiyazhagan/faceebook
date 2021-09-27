import requests

token = '2020519791:AAFj3LNfordKPN4VNiBAwsedwg0AnDHQkMo'


def broadcast_msg(list_of_groups, msg):
    print(msg)
    for group_id in list_of_groups:
        to_url = 'https://api.telegram.org/bot{}/sendMessage?chat_id={}&text={}&parse_mode=HTML'.format(
            token, group_id, msg)
     #   print(to_url)
        resp = requests.get(to_url)
     #   print(resp.text)


list_of_groups = ['-529132320', '-524926679', '-558767274']

msg = "This Is Group "
broadcast_msg(list_of_groups, msg)

print("program ended")
