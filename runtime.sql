/* *********************************** Configuraciones de motor MySql *********************************** */

/* -------------------------------------- Variables Globales -------------------------------------- */
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''));
SET GLOBAL log_bin_trust_function_creators = 1;
SET sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET GLOBAL event_scheduler = ON;

/* -------------------------------------- Eventos -------------------------------------- */
CREATE EVENT insertion_event
ON SCHEDULE EVERY 1 YEAR STARTS '2023-01-01 00:00:00'
DO INSERT INTO periodo VALUES ('', year(curdate()));

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
CREATE PROCEDURE `crudUsuario`(
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

/* -------------------------------------- crudPresupuesto -------------------------------------- */
CREATE PROCEDURE `crudPresupuesto`(
in v_idpresupuesto int, 
in v_valorPresupuesto decimal(20,2), 
in v_creado_el datetime, 
in v_modificado_el datetime, 
in v_idperiodo int, 
in v_idmes int, 
in v_idconcepto int, 
in v_idusuario int, 
in accion varchar(45)
)
BEGIN
DECLARE mes INT DEFAULT 12;
	CASE
		WHEN accion = 'crear' then
			while mes > 0 do
				set v_idpresupuesto = 0;
				insert into presupuesto values (v_idpresupuesto, v_valorPresupuesto, v_creado_el, v_modificado_el, v_idperiodo, mes, v_idconcepto, v_idusuario);
				set mes = mes - 1;
			end while;
			select ('Se ha registrado el presupuesto anual para el concepto') as mensaje;
	END CASE;
END

/* -------------------------------------- Vistas Views -------------------------------------- */
CREATE 
    ALGORITHM = UNDEFINED 
    SQL SECURITY DEFINER
VIEW `vpresupuesto` AS
    SELECT 
        `p`.`periodo` AS `periodo`,
        `m`.`nombreMes` AS `nombreMes`,
        `t`.`nombreCategoria` AS `tipo`,
        `c`.`categoria` AS `concepto`,
        `pr`.`valorPresupuesto` AS `valorPresupuesto`,
        `pr`.`modificado_el` AS `modificado_el`
    FROM
        ((((`presupuesto` `pr`
        JOIN `periodo` `p` ON ((`pr`.`idperiodo` = `p`.`idperiodo`)))
        JOIN `mes` `m` ON ((`pr`.`idmes` = `m`.`idmes`)))
        JOIN `concepto` `c` ON ((`pr`.`idconcepto` = `c`.`idconcepto`)))
        JOIN `categoria` `t` ON ((`c`.`idcategoria` = `t`.`idcategoria`)))
    ORDER BY `pr`.`idmes`