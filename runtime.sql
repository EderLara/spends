/* -------------------------------------- Login -------------------------------------- */
CREATE PROCEDURE `loginUser`(
in nickuser varchar(200),
in passuser varchar(200)
)
BEGIN
	DECLARE sub int;
    
    SET sub = (
		select count(u.idusuario)	
		from usuario u 
		inner join datosUsuario d
		on d.idusuario = u.idusuario
		where u.nickname = nickuser and u.password = sha(passuser)
		);
	 if sub != 1 then
		select ('NoAuth') as mensaje;
	 else
		select u.idusuario, u.nickname, d.nombreUsuario, d.emailUsuario, d.fechaNace, u.estado
		from usuario u 
		inner join datosUsuario d
		on d.idusuario = u.idusuario
		where u.nickname = nickuser and u.password = sha(passuser);
	end if;
END

/* -------------------------------------- crudUsuario -------------------------------------- */
CREATE DEFINER=`root`@`%` PROCEDURE `crudUsuario`(
in v_idusuario int,
in v_nickname varchar(150),
in v_passuser varchar(200),
in v_nameuser varchar(255),
in v_emailuser varchar(150),
in v_fechanace date,
in v_imguser varchar(150),
in v_creadoel datetime,
in v_modificado datetime,
in accion varchar(45)
)
BEGIN
CASE 
	when accion = 'crear' then
		set @estado = 'Activo'; 
		# validaciòn deusuario creado:
        set @usuario = (select ifnull(count(emailUsuario), 0) from datosUsuario where emailUsuario = v_emailuser);
        if @usuario = 0 then
			set v_idusuario = 0;
			insert into usuario values (v_idusuario, v_nickname, sha(v_passuser), @estado, v_creadoel, v_modificado);
            # Capturamos el id del usuario creado:
            set @id = (select idusuario from usuario where nickname = v_nickname);
            insert into datosUsuario values (v_idusuario, v_nameuser, v_emailuser, v_fechanace, v_imguser, v_creadoel, v_modificado, @id);
            # mostramos el usuario ingresado:
            select u.idusuario, u.nickname, d.nombreUsuario, d.emailUsuario, d.fechaNace, u.estado
			from usuario u 
			inner join datosUsuario d
			on d.idusuario = u.idusuario
			where emailUsuario = v_emailuser;
        else
			select ('El usuario que intenta crear ya existe') as mensaje;
        end if;
end case;	
END