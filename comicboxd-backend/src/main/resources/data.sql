INSERT INTO tb_roles (role_id, role_name) VALUES (1, 'ROLE_ADMIN')
    ON CONFLICT (role_id) DO NOTHING;
INSERT INTO tb_roles (role_id, role_name) VALUES (2, 'ROLE_BASIC')
    ON CONFLICT (role_id) DO NOTHING;
