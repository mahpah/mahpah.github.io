---
layout: post
tags:
  - docker
title: Tự deploy một docker registry
---

## Các bước tiến hành

Docker registry cũng được chạy dưới dạng 1 docker container. Image của nó là `registry`. Tag stable hiện đang là 2.

```sh
$ docker run -p 5000:5000 registry:2

<log go here>
```

Để dễ lưu lại các tham số, nên sử dụng docker-compose

```yml
# docker-compose.yml
version: '3'

services:
  registry:
    restart: always
    image: registry:2
    ports:
      - 5000:5000
```

Chạy compose

```sh
docker-compose up
```

## Tạo file cấu hình

Cấu hình có thể được truyền vào bằng file cấu hình hoặc biến môi trường. Tên biến môi trường được đặt là tên key, phân cách bởi dấu `_`, prefix là `REGISTRY_`. Ví dụ,   `REGISTRY_STORAGE_CACHE_BLOBDESCRIPTOR=inmemory`

Một file cấu hình tối thiểu như sau:

```yml
# config.yml

version: 0.1

log:
  fields:
    service: registry

storage:
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry

health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3

http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
```

Update compose file, mount file config:

```yml
volumes:
    - ./config.yml:/etc/docker/registry/config.yml
```

## Cấu hình TLS

```yml
http:
    tls:
        letsencrypt:
        cachefile: /etc/docker/registry/letsencrypt.json
        email: <some email>
```

Bad news, it didn't work. See https://github.com/docker/distribution/issues/2545

Để có thể sử dụng letsencrypt, tạo 1 certificate dạng standalone:

```sh
$ certbot certonly --standalone -d <domain của bạn>

fullchain.pem privkey.pem
```

Thiết lập đường dẫn đến file

```yml
#config.yml

http:
    tls:
        certificate: <path to fullchain.pem>
        key: <path to privkey.pem>
```

Lỗi thường gặp ở đây là chỉ định file certificate laf cert.pem. Điều này sẽ dẫn đến handshake thất bại vì unrecognized authority.

## Hạn chế truy cập

Dưới đây mô tả authorize đơn giản với username/password

Tạo mới file pass

```sh
docker run \
  --entrypoint htpasswd \
  registry:2 -Bbn testuser testpassword > auth/htpasswd
```

File `htpassword`

```plaintext
testuser:<some cryptic hash>
```

mount file htpassword vào vị trí `/auth/htpasswd` và thiết lập môi trường bắt buộc authorize để access

```yml
# docker-compose.yml

environment:
  REGISTRY_AUTH: htpasswd
  REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd
  REGISTRY_AUTH_HTPASSWD_REALM: Registry Realm

volumes:
  - ./auth:/auth
```

Đăng nhập vào registry

```sh
docker login <your-registry>
```

Tag và push lên:

```sh
docker tag <your-registry>/<your-image>

docker push <your-registry>/<your-image>
```
