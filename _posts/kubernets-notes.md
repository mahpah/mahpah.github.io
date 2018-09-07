Tạo mới resource

```sh
kubectl create -f <file_name>
```

View pod logs

```sh
kubectl logs <pod_name>
```

## Architecture:

```
|__ Master
|    |__ scheduler
|    |__ Controllers manager (cloud + kube controller)
|    |__ API service
|    |__ etcd (a key value store)
|
|__ Nodes
     |__ kubelet
     |__ kube proxy
```

## Objects:
- Pod === group of containers sharing volumes, network
- Services = exposing pod to outside world
- Namespace
- Controllers = higher level abstraction

## Controllers:
- Deployment
- ReplicaSet
- StatefulSet
- DaemonSet
- Job

## Node port:

```yml
# kind: Service

ports:
    - name: http
      nodePort: 30432
      port: 80
      targetPort: 8080
```

- Outside cluster, request to node go through port 30432
- inside cluster, all request come to port 80 will be route to port 8080 of the included container