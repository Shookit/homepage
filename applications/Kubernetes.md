## Ingress

```yaml
# 1.18
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  rules:
  - http:
      paths:
      - path: /apple
        backend:
          serviceName: apple-service
          servicePort: 5678
      - path: /banana
        backend:
          serviceName: banana-service
          servicePort: 5678
      - path: /
        backend:
          serviceName: banana-service
          servicePort: 5678

---

# 1.19
# apiVersion: networking.k8s.io/v1
# kind: Ingress
# metadata:
#   name: example-ingress
#   annotations:
#     ingress.kubernetes.io/rewrite-target: /
# spec:
#   rules:
#   - http:
#       paths:
#       - pathType: Prefix
#         path: /apple
#         backend:
#           service:
#             name: apple-service
#             port:
#               number: 5678
#       - pathType: Prefix
#         path: /banana
#         backend:
#           service:
#             name: banana-service
#             port:
#               number: 5678
#       - pathType: Prefix
#         path: /
#         backend:
#           service:
#             name: banana-service
#             port:
#               number: 5678

```


## Services and deployments

```yaml
---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: apple-app
  labels:
    app: apple
spec:
  replicas: 3
  selector:
    matchLabels:
      app: apple
  template:
    metadata:
      labels:
        app: apple
    spec:
      containers:
      - name: apple-app
        image: hashicorp/http-echo
        args:
          - "-text=apple"

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: banana-app
  labels:
    app: banana
spec:
  replicas: 3
  selector:
    matchLabels:
      app: banana
  template:
    metadata:
      labels:
        app: banana
    spec:
      containers:
      - name: banana-app
        image: hashicorp/http-echo
        args:
          - "-text=banana"

---

kind: Service
apiVersion: v1
metadata:
  name: apple-service
spec:
  selector:
    app: apple
  ports:
    - port: 5678

---

kind: Service
apiVersion: v1
metadata:
  name: banana-service
spec:
  selector:
    app: banana
  ports:
    - port: 5678
```
