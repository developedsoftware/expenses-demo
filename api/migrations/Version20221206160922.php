<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221206160922 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE claim (id INT AUTO_INCREMENT NOT NULL, patient_id_id INT NOT NULL, site_id_id INT NOT NULL, claim_status_id_id INT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', submitted_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_A769DE27EA724598 (patient_id_id), INDEX IDX_A769DE27BB1E4E52 (site_id_id), INDEX IDX_A769DE27C9D8BF44 (claim_status_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE claim_item (id INT AUTO_INCREMENT NOT NULL, claim_id_id INT NOT NULL, expense_type_id_id INT DEFAULT NULL, currency_id_id INT DEFAULT NULL, amount INT DEFAULT NULL, additional_info LONGTEXT DEFAULT NULL, claim_timestamp DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_5114B23A43097511 (claim_id_id), INDEX IDX_5114B23AC15C26A9 (expense_type_id_id), INDEX IDX_5114B23A28A69C31 (currency_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE claim_item_receipt (id INT AUTO_INCREMENT NOT NULL, claim_item_id_id INT DEFAULT NULL, data LONGBLOB DEFAULT NULL, INDEX IDX_1902E0F2889F893B (claim_item_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE claim_status (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE currency (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE expense_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient (id INT AUTO_INCREMENT NOT NULL, registration_number INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) DEFAULT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient_address (id INT AUTO_INCREMENT NOT NULL, patient_id_id INT NOT NULL, line1 VARCHAR(255) NOT NULL, line2 VARCHAR(255) DEFAULT NULL, line3 VARCHAR(255) DEFAULT NULL, area_code VARCHAR(255) NOT NULL, country_code VARCHAR(255) NOT NULL, INDEX IDX_502D3A6AEA724598 (patient_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient_payment_gateway (id INT AUTO_INCREMENT NOT NULL, patient_id_id INT NOT NULL, data JSON DEFAULT NULL, INDEX IDX_EC035A3CEA724598 (patient_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE site (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, reference VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE study (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, reference VARCHAR(255) NOT NULL, INDEX IDX_E67F97497096A49F (claim_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', email VARCHAR(180) NOT NULL, password VARCHAR(255) NOT NULL, roles JSON NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE claim ADD CONSTRAINT FK_A769DE27EA724598 FOREIGN KEY (patient_id_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE claim ADD CONSTRAINT FK_A769DE27BB1E4E52 FOREIGN KEY (site_id_id) REFERENCES site (id)');
        $this->addSql('ALTER TABLE claim ADD CONSTRAINT FK_A769DE27C9D8BF44 FOREIGN KEY (claim_status_id_id) REFERENCES claim_status (id)');
        $this->addSql('ALTER TABLE claim_item ADD CONSTRAINT FK_5114B23A43097511 FOREIGN KEY (claim_id_id) REFERENCES claim (id)');
        $this->addSql('ALTER TABLE claim_item ADD CONSTRAINT FK_5114B23AC15C26A9 FOREIGN KEY (expense_type_id_id) REFERENCES expense_type (id)');
        $this->addSql('ALTER TABLE claim_item ADD CONSTRAINT FK_5114B23A28A69C31 FOREIGN KEY (currency_id_id) REFERENCES currency (id)');
        $this->addSql('ALTER TABLE claim_item_receipt ADD CONSTRAINT FK_1902E0F2889F893B FOREIGN KEY (claim_item_id_id) REFERENCES claim_item (id)');
        $this->addSql('ALTER TABLE patient_address ADD CONSTRAINT FK_502D3A6AEA724598 FOREIGN KEY (patient_id_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE patient_payment_gateway ADD CONSTRAINT FK_EC035A3CEA724598 FOREIGN KEY (patient_id_id) REFERENCES patient (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE claim DROP FOREIGN KEY FK_A769DE27EA724598');
        $this->addSql('ALTER TABLE claim DROP FOREIGN KEY FK_A769DE27BB1E4E52');
        $this->addSql('ALTER TABLE claim DROP FOREIGN KEY FK_A769DE27C9D8BF44');
        $this->addSql('ALTER TABLE claim_item DROP FOREIGN KEY FK_5114B23A43097511');
        $this->addSql('ALTER TABLE claim_item DROP FOREIGN KEY FK_5114B23AC15C26A9');
        $this->addSql('ALTER TABLE claim_item DROP FOREIGN KEY FK_5114B23A28A69C31');
        $this->addSql('ALTER TABLE claim_item_receipt DROP FOREIGN KEY FK_1902E0F2889F893B');
        $this->addSql('ALTER TABLE patient_address DROP FOREIGN KEY FK_502D3A6AEA724598');
        $this->addSql('ALTER TABLE patient_payment_gateway DROP FOREIGN KEY FK_EC035A3CEA724598');
        $this->addSql('DROP TABLE claim');
        $this->addSql('DROP TABLE claim_item');
        $this->addSql('DROP TABLE claim_item_receipt');
        $this->addSql('DROP TABLE claim_status');
        $this->addSql('DROP TABLE currency');
        $this->addSql('DROP TABLE expense_type');
        $this->addSql('DROP TABLE patient');
        $this->addSql('DROP TABLE patient_address');
        $this->addSql('DROP TABLE patient_payment_gateway');
        $this->addSql('DROP TABLE site');
        $this->addSql('DROP TABLE study');
        $this->addSql('DROP TABLE `user`');
    }
}
