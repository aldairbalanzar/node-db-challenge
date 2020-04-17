exports.up = function(knex) {
    return(
        knex.schema
        .createTable('projects', tbl => {
            tbl.integer('id', 255).primary();
            tbl.string('projectName', 255).notNullable().unique();
            tbl.text('description')
            tbl.boolean('completed').defaultTo(false);
        })
        .createTable('tasks', tbl => {
            tbl.integer('id', 255).primary();
            tbl.string('taskDescription', 255).notNullable();
            tbl.text('notes', 255)
            tbl.integer('project_id', 255);
            tbl.boolean('completed').defaultTo(false);
        })

        .createTable('resources', tbl => {
            tbl.integer('id', 255).primary();
            tbl.string('resourceName', 255).unique().notNullable();
            tbl.text('description');
        })

        .createTable('projects_resources', tbl => {
            tbl.integer('id', 255).primary();
            //project foreign key
            tbl.integer('project_id', 255)
            .notNullable()
            .references('projects.id')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
            //resources foreign key
            tbl.integer('resource_id')
            .notNullable()
            .references('resources.id')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        })
    )
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('projects_resources')
  .dropTableIfExists('resources')
  .dropTableIfExists('tasks')
  .dropTableIfExists('projects')
};
