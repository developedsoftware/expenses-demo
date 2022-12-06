<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221206171719 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE claim ADD claim_status_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE claim ADD CONSTRAINT FK_A769DE271A8775D2 FOREIGN KEY (claim_status_id) REFERENCES claim_status (id)');
        $this->addSql('CREATE INDEX IDX_A769DE271A8775D2 ON claim (claim_status_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE claim DROP FOREIGN KEY FK_A769DE271A8775D2');
        $this->addSql('DROP INDEX IDX_A769DE271A8775D2 ON claim');
        $this->addSql('ALTER TABLE claim DROP claim_status_id');
    }
}
