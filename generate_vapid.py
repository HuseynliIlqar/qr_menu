from py_vapid import Vapid
import base64

vapid = Vapid()
vapid.generate_keys()

# Manual olaraq base64-ə çevirin
public_key_bytes = vapid.public_key.to_string()
public_key_b64 = base64.urlsafe_b64encode(public_key_bytes).strip(b'=').decode('utf-8')

print("PUBLIC KEY:")
print(public_key_b64)

# Private key üçün save edin və oxuyun
vapid.save_key('private_key.pem')
with open('private_key.pem', 'r') as f:
    private_key = f.read()

print("\nPRIVATE KEY:")
print(private_key)