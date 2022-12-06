<?php

declare(strict_types=1);

namespace App\Tests\Api;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class SwaggerTest extends WebTestCase
{
    private KernelBrowser $client;

    protected function setup(): void
    {
        $this->client = self::createClient();
    }
    
    public function testServers(): void
    {
        $this->client->request('GET', '/docs.json');
        self::assertResponseIsSuccessful();
        self::assertStringContainsString('"servers":', (string) $this->client->getResponse()->getContent());
    }

    public function testPaths(): void
    {
        $this->client->request('GET', '/docs.json');
        self::assertResponseIsSuccessful();
        self::assertStringContainsString('"paths":', (string) $this->client->getResponse()->getContent());
    }
    
    public function testComponents(): void
    {
        $this->client->request('GET', '/docs.json');
        self::assertResponseIsSuccessful();
        self::assertStringContainsString('"components":', (string) $this->client->getResponse()->getContent());
    }
}
