Link de la aplicación: http://lab4-1367134820.us-east-1.elb.amazonaws.com:3000/ (Si no le deja entrar es porque apague los recursos por motivo de cobro, pero pienso dejarlo unos días encendido)
Link de github: 
https://github.com/LuisOvalle/laboratorio4
Pasos a seguir para realizar el laboratorio:

Buscar un tutorial para crear una base de datos en mysql en amazon

Crear base de datos y modificarla desde workbech
 
Buscar tutorial de un crud en node js. Crear el crud.

Se creo un repositorio para subir el crud: https://github.com/LuisOvalle/laboratorio4
 




Se clono el repositorio a la maquina virtual
 
Se publico el sitio web y se podía acceder a el desde la ip publica







Se creo una imagen de la instancia.
 


Se creo una configuración de arranque y el auto scaling group
 
Se creo un balanceador de cargas y fue asociado al auto scaling group
 

Load balancer:
 
Se instalo la aplicación stress para verificar el autoescalamiento y funcionamiento de las instancias, este consume los recursos de una instancia y por lo mismo se levantan las alertas, por consiguiente, se crean más instancias.
 








Aquí se puede obserar las instanciaas creadas, están como fuera de servicio porque no había corregido el error de node para ese entonces.
 
Aquí esta el historial de actividad, que también es otra prueba de que se generaron las instancias por la alerta de consumo del cpu.
 



Codigo que se puso en la configuración de inicio de las instancias:
#!/bin/bash
cd /home/ec2-user/laboratorio4
/usr/bin/node index.js

Con este código ya aparecen las instancias en servicio.
 








Json de cloud Formation la imagen que utilice para que se creen las instancias del autoscaling group. Empecé a investigar, pero no estaba del todo seguro como ir uniendo los diferentes componentes
{
   "Resources": {
       "EC2I1U6L5": {
           "Type": "AWS::EC2::Instance",
           "Properties": {
               "ImageId": "ami-041f44538e3069147",
               "InstanceType" : "t1.micro"
           }
       }
   }
}
