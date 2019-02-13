modprobe v4l2_common && python picameralapse.py &
cd /data
python -m SimpleHTTPServer 80
